import{a as h,i as f,S as x}from"./assets/vendor-682c5945.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();h.defaults.baseURL="https://pixabay.com/api/";h.defaults.params={image_type:"photo",orientation:"horizontal",per_page:40,key:"32013564-eb97bf6234748c3565a98072a"};const C=async(t,e)=>{const{data:o}=await h.get("",{params:{q:t,page:e}});return o};function l(t){let e=null;switch(!0){case t>=1e8:return e=Math.round(t/1e6),`${e}M`;case t>=1e6:return e=Math.round(t/1e5)/10,`${e}M`;case t>=1e5:return e=Math.round(t/1e3),`${e}k`;case t>=1e3:return e=Math.round(t/100)/10,`${e}k`;default:return t}}function v(t){return t.map(({tags:e,webformatURL:o,largeImageURL:i,views:r,downloads:s,likes:n,comments:b})=>`
<li class="photo-card">
  <a href="${i}" class="photo-card-link">
    <img class="photo-card-image" src="${o}" alt="${e}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item likes">
    <box-icon name='heart' color='#f3f3f3'></box-icon>
      ${l(n)}
    </p>
    <p class="info-item">
    <box-icon name='show-alt'color='#f3f3f3'></box-icon>
      ${l(r)}
    </p>
    <p class="info-item">
    <box-icon name='chat'color='#f3f3f3'></box-icon>
      ${l(b)}
    </p>
    <p class="info-item">
    <box-icon name='download' type='solid' color='#f3f3f3' ></box-icon>
      ${l(s)}
    </p>
  </div>
</li>
`).join("")}const d={timeout:3e3,close:!1,closeOnClick:!0,icon:null,position:"topRight",transitionIn:"fadeInDown",transitionOut:"fadeOutUp"};class a{static success(e){f.success({title:"OK",titleColor:"green",message:e,messageColor:"green",progressBarColor:"green",...d})}static error(e){f.error({title:"Error",titleColor:"red",message:e,messageColor:"red",progressBarColor:"red",...d})}static warning(e){f.warning({title:"Caution",message:e,titleColor:"red",messageColor:"red",progressBarColor:"red",...d})}}const y=document.querySelector("#search-form"),g=document.querySelector(".gallery");let c=1,u="",m=0,p=1;const M={rootMargin:"200px",threshold:.1},$=new x(".gallery a",{captionsData:"alt",captionDelay:250,animationSpeed:250,overlay:!0,showCounter:!1,fadeSpeed:200,close:!0,showCounter:!0});function q(t,e){t.forEach(async o=>{o.isIntersecting&&(e.unobserve(o.target),await w())})}const L=new IntersectionObserver(q,M);async function O(t){if(t.preventDefault(),t.target.elements.searchQuery.value.trim()==="")return a.error("Please enter a search query!");if(t.target.elements.searchQuery.value.trim()===u)return a.warning("Please enter a new search query! Or scroll down");await w()}function S(){const t=y.elements.searchQuery.value.trim();return t!==u?(c=1,p=1,u=t,!0):(c+=1,!1)}async function w(){const t=S();if(t&&(g.innerHTML=""),c>p){a.warning("No more images");return}let e;try{const o=await C(u,c);e=o.hits,m=o.totalHits,p=Math.ceil(m/40)}catch(o){a.error(o.message)}if(!e.length){a.error("Sorry, there are no images matching your search query. Please try again.");return}if(t){const o=`"Hooray! We found ${m} images."`;a.success(o)}g.insertAdjacentHTML("beforeend",v(e)),L.observe(g.lastElementChild),$.refresh()}y.addEventListener("submit",O);
//# sourceMappingURL=commonHelpers.js.map
