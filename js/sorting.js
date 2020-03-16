'use strict';

(function () {
  var sortImages = document.querySelector('.img-filters');
  var sortButtons = sortImages.querySelectorAll('.img-filters__button');
  var defaultPhotosButtonSort = sortImages.querySelector('#filter-default');
  var randomPhotosButtonSort = sortImages.querySelector('#filter-random');
  var discussedPhotosButtonSort = sortImages.querySelector('#filter-discussed');

  function sortByDefault(evt) {
    changeActiveButton(evt);

    var photos = window.data.getCurrentData();

    window.gallery.removePhotos();
    window.gallery.renderPhotos(photos);
  }

  function sortByDiscussedPhotos(evt) {
    changeActiveButton(evt);

    var photos = window.data.getCurrentData();

    var discussedPhotos = getDiscussedPhotos(photos);
    window.gallery.removePhotos();
    window.gallery.renderPhotos(discussedPhotos);
  }

  function sortBySomeRandomPhotos(evt) {
    changeActiveButton(evt);

    var photos = window.data.getCurrentData();

    var randomPhotos = getSomeRandomPhotos(photos);
    window.gallery.removePhotos();
    window.gallery.renderPhotos(randomPhotos);
  }

  function changeActiveButton(evt) {
    sortButtons.forEach(function (element) {
      window.utils.removeClassName(element, 'img-filters__button--active');
    });
    window.utils.addClassName(evt.target, 'img-filters__button--active');
  }

  function getDiscussedPhotos(photos) {
    var mappedArray = photos.map(function (el, i) {
      return {index: i, value: el.comments.length};
    });

    mappedArray.sort(function (a, b) {
      return b.value - a.value;
    });

    var discussedPictures = mappedArray.map(function (el) {
      return photos[el.index];
    });

    return discussedPictures;
  }

  function getSomeRandomPhotos(photos) {
    var someRandomPhotos = photos.map(function (elem) {
      return [elem, Math.random()];
    })
      .sort(function (a, b) {
        return a[1] - b[1];
      })
      .map(function (elem) {
        return elem[0];
      })
      .slice((photos.length - window.constants.MAX_LENGTH_GALLERY), photos.length);

    return someRandomPhotos;
  }

  var sortPhoto = function () {
    window.utils.removeClassName(sortImages, 'img-filters--inactive');

    defaultPhotosButtonSort.addEventListener('click', window.debounce(sortByDefault));
    discussedPhotosButtonSort.addEventListener('click', window.debounce(sortByDiscussedPhotos));
    randomPhotosButtonSort.addEventListener('click', window.debounce(sortBySomeRandomPhotos));
  };

  window.sorting = {
    sortPhoto: sortPhoto
  };
})();
