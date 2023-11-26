import SimpleLightbox from 'simplelightbox';
import { getImages } from './request.js';
import createMarkup from './markup.js';
import { Messages } from './messages.js';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

let page = 1;
let query = '';
let totalHits = 0;
let totalPages = 1;

const options = {
  rootMargin: '200px',
  threshold: 0.1,
};

const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  animationSpeed: 250,
  overlay: true,
  showCounter: false,
  fadeSpeed: 200,
  close: true,
  showCounter: true,
});

/**
 * Callback for Intersection Observer
 * @param {*} entries
 * @param {*} observer
 */
function onEntry(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await makeRender();
    }
  });
}

const observer = new IntersectionObserver(onEntry, options);

/**
 * Processing the form submit event
 * @param {*} e
 * @returns
 */
async function querySubmitHandler(e) {
  e.preventDefault();
  if (e.target.elements.searchQuery.value.trim() === '') {
    return Messages.error('Please enter a search query!');
  }
  if (e.target.elements.searchQuery.value.trim() === query) {
    return Messages.warning('Please enter a new search query! Or scroll down');
  }
  await makeRender();
}

/**
 * Checking and processing changes in the search query
 * @returns
 */
function queryChecker() {
  const newQuery = form.elements.searchQuery.value.trim();
  if (newQuery !== query) {
    page = 1;
    totalPages = 1;
    query = newQuery;
    return true;
  } else {
    page += 1;
    return false;
  }
}

/**
 * Gallery update function
 * @returns
 */
async function makeRender() {
  const isFirstQuery = queryChecker();
  if (isFirstQuery) {
    gallery.innerHTML = '';
  }

  if (page > totalPages) {
    Messages.warning('No more images');
    return;
  }
  let hits;
  try {
    const data = await getImages(query, page);
    hits = data.hits;
    totalHits = data.totalHits;
    totalPages = Math.ceil(totalHits / 40);
  } catch (error) {
    Messages.error(error.message);
  }

  if (!hits.length) {
    Messages.error(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  if (isFirstQuery) {
    const massage = `"Hooray! We found ${totalHits} images."`;
    Messages.success(massage);
  }
  gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
  observer.observe(gallery.lastElementChild);
  lightBox.refresh();
}

form.addEventListener('submit', querySubmitHandler);
