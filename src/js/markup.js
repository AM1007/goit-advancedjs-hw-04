import numberText from './stats';
import 'boxicons';

/**
 * create Markup function
 * @param {*} data
 * @returns
 */
export default function createMarkup(data) {
  return data
    .map(
      ({
        tags,
        webformatURL,
        largeImageURL,
        views,
        downloads,
        likes,
        comments,
      }) => `
<li class="photo-card">
  <a href="${largeImageURL}" class="photo-card-link">
    <img class="photo-card-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item likes">
    <box-icon name='heart' color='#f3f3f3'></box-icon>
      ${numberText(likes)}
    </p>
    <p class="info-item">
    <box-icon name='show-alt'color='#f3f3f3'></box-icon>
      ${numberText(views)}
    </p>
    <p class="info-item">
    <box-icon name='chat'color='#f3f3f3'></box-icon>
      ${numberText(comments)}
    </p>
    <p class="info-item">
    <box-icon name='download' type='solid' color='#f3f3f3' ></box-icon>
      ${numberText(downloads)}
    </p>
  </div>
</li>
`
    )
    .join('');
}
