'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  var sortImages = document.querySelector('.img-filters');
  var defaultPhotosButtonSort = sortImages.querySelector('#filter-default');
  var randomPhotosButtonSort = sortImages.querySelector('#filter-random');
  var discussedPhotosButtonSort = sortImages.querySelector('#filter-discussed');

  function onError(message) {
    window.utils.renderInfoMessage('#error', '.error', message);
  }

  function onSuccess(data) {
    window.data.savePhotos(data);
    var photos = window.data.getCurrentData();

    function sortByDefault() {
      window.gallery.removePhotos();
      window.gallery.renderPhotos(photos);
    }

    function sortByDiscussedPhotos() {
      var discussedPhotos = getDiscussedPhotos();
      window.gallery.removePhotos();
      window.gallery.renderPhotos(discussedPhotos);
    }

    function sortBySomeRandomPhotos() {
      var randomPhotos = getSomeRandomPhotos();
      window.gallery.removePhotos();
      window.gallery.renderPhotos(randomPhotos);
    }

    function getDiscussedPhotos() {
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

    function getSomeRandomPhotos() {
      var someRandomPhotos = photos.map(function (elem) {
        return [elem, Math.random()];
      })
        .sort(function (a, b) {
          return a[1] - b[1];
        })
        .map(function (elem) {
          return elem[0];
        });
      someRandomPhotos.length = window.constants.MAX_LENGTH_GALLERY;

      return someRandomPhotos;
    }

    var sortPhoto = function () {
      window.utils.removeClassName(sortImages, 'img-filters--inactive');

      defaultPhotosButtonSort.addEventListener('click', sortByDefault);
      discussedPhotosButtonSort.addEventListener('click', sortByDiscussedPhotos);
      randomPhotosButtonSort.addEventListener('click', sortBySomeRandomPhotos);
    };

    window.sorting = {
      sortPhoto: sortPhoto
    };
  }

  window.backend.load(URL, 'GET', onSuccess, onError);

})();
