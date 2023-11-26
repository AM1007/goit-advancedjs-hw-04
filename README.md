### Task: Searchify

Create the frontend part of an application for searching and viewing images
based on a keyword. Add styling to the interface elements.

Watch the demo video of the application in action.

https://user-images.githubusercontent.com/17479434/125040406-49a6f600-e0a0-11eb-975d-e7d8eaf2af6b.mp4

#### Search form

The form is initially included in the HTML document. The user will input a
search query into the text field, and upon form submission, an HTTP request
needs to be executed.

```html
<form class="search-form" id="search-form">
  <input
    type="text"
    name="searchQuery"
    autocomplete="off"
    placeholder="Search images..."
  />
  <button type="submit">Search</button>
</form>
```

#### HTTP-requests

For the backend, use the public [Pixabay](https://pixabay.com/api/docs/) API
service. Register, obtain your unique access key, and familiarize yourself with
the documentation.

List of query string parameters that you must specify:

- `key` - your unique access key to the API.
- `q` - the term for searching. What the user will input.
- `image_type` - the type of image. Only photos are needed, so set the value to
  `photo`.
- `orientation` - the orientation of the photo. Set the value to `horizontal`.
- `safesearch` - age filter. Set the value to `true`.

The response will be an array of images that meet the criteria of the query
parameters. Each image is described by an object, and you are only interested in
the following properties:

- `webformatURL` - link to a small image for the card list.
- `largeImageURL` - link to the large image.
- `tags` - a string with the description of the image. Suitable for the alt
  attribute.
- `likes` - the number of likes.
- `views` - the number of views.
- `comments` - the number of comments.
- `downloads` - the number of downloads.

If the backend returns an empty array, it means nothing suitable was found. In
that case, display a message with the text "Sorry, there are no images matching
your search query. Please try again." For messages, use the
[iziToast](https://izitoast.marcelodolza.com/) library.

#### Gallery and Image Card

The `div.gallery` element is initially present in the HTML document, and it
needs to render the layout of image cards. When searching for a new keyword, it
is necessary to completely clear the content of the gallery to avoid mixing
results.

```html
<div class="gallery">
  <!-- Image Card -->
</div>
```

Template for the layout of a card for one image in the gallery.

```html
<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>
```

#### Pagination

Pixabay API supports pagination and provides the parameters `page` and
`per_page`. Set it up so that each response brings 40 objects (by default it's
20).

- The initial value of the `page` parameter should be 1.
- With each subsequent request, it needs to be increased by 1.
- In case of searching with a new keyword, the value of `page` should be reset
  to the initial value, as there will be pagination over a new collection of
  images.

The HTML document already contains the button layout, and upon clicking it, a
request for the next group of images needs to be executed, and the layout should
be added to the existing gallery elements.

```html
<button type="button" class="load-more">Load more</button>
```

- In the initial state, the button should be hidden.
- After the first request, the button appears in the interface below the
  gallery.
- Upon a subsequent form submit, the button is initially hidden again and then
  reappears after the request.

In the backend response, the property `totalHits` is returned - the total number
of images that match the search criteria (for a free account). If the user has
reached the end of the collection, hide the button and display a message with
the text `"We're sorry, but you've reached the end of search results."`

## Additionally

> [!Warning]The following functionality is not mandatory for completing the task
> but will be a good additional practice.

#### Message

After the first request, with each new search, receive a message indicating how
many images were found in total (the `totalHits` property). The message text
should be `"Hooray! We found totalHits images."`

#### `SimpleLightBox` Library

Add the display of a larger version of the image using the
[SimpleLightbox](https://simplelightbox.com/) library for a full-fledged
gallery.

- The markup will need to wrap each image card in a reference as specified in
  the documentation.
- The library contains a `refresh()` method that must be called every time a new
  group of image cards is added.

In order to connect the CSS code of the library to the project, it is necessary
to add one more import, in addition to the one described in the documentation.

```js
// Described in the documentation
import SimpleLightbox from 'simplelightbox';
// Additional import of styles
import 'simplelightbox/dist/simple-lightbox.min.css';
```

#### Page scrolling

Make smooth scrolling of the page after requesting and rendering each subsequent
group of images. Here is a hint code for you, but figure it out yourself.

```js
const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
```

#### Infinite scroll

Instead of the "Load more" button, you can make endless loading of images while
scrolling the page. We give you full freedom of action in implementation, you
can use any libraries.

---

## Preparing for work

1. Make sure you have the LTS version of Node.js installed on your computer.  
    [Download and install](https://nodejs.org/en/) it if necessary.

2. Install the basic project dependencies in the terminal with the command  
    `npm install`.

3. Start the development mode by running the command `npm run dev` in the  
    terminal.

4. Go to the following address in your browser  
    [http://localhost:5173](http://localhost:5173). This page will automatically
      reload automatically after saving changes to the project files.
