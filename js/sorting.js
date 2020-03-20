'use strict';

(function () {
  var sortImages = document.querySelector('.img-filters');
  var sortButtons = sortImages.querySelectorAll('.img-filters__button');
  var defaultPhotosButtonSort = sortImages.querySelector('#filter-default');
  var randomPhotosButtonSort = sortImages.querySelector('#filter-random');
  var discussedPhotosButtonSort = sortImages.querySelector('#filter-discussed');

  function sortByDefault(evt) {
    changeActiveButton(evt);

    var photos = window.data.getOriginalData();

    window.gallery.removePhotos();
    window.gallery.renderPhotos(photos);
  }

  function sortByDiscussedPhotos(evt) {
    changeActiveButton(evt);

    var photos = window.data.getOriginalData();

    var discussedPhotos = getDiscussedPhotos(photos);
    window.data.savePhotos(discussedPhotos);

    window.gallery.removePhotos();
    window.gallery.renderPhotos(discussedPhotos);
  }

  function sortBySomeRandomPhotos(evt) {
    changeActiveButton(evt);

    var photos = window.data.getOriginalData();

    var randomPhotos = getSomeRandomPhotos(photos);
    window.data.savePhotos(randomPhotos);

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
    var mappedPhotos = photos.map(function (el, i) {
      return {index: i, value: el.comments.length};
    });

    mappedPhotos.sort(function (a, b) {
      return b.value - a.value;
    });

    var discussedPictures = mappedPhotos.map(function (el) {
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

  function init() {
    window.utils.removeClassName(sortImages, 'img-filters--inactive');

    defaultPhotosButtonSort.addEventListener('click', window.debounce(sortByDefault));
    discussedPhotosButtonSort.addEventListener('click', window.debounce(sortByDiscussedPhotos));
    randomPhotosButtonSort.addEventListener('click', window.debounce(sortBySomeRandomPhotos));
  }

  window.sorting = {
    init: init
  };
})();
