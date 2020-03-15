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
    // Сохранияем фотки
    window.data.savePhotos(data);
    var photos = window.data.getCurrentData();
    // Показываем фотки
    window.gallery.renderPhotos(photos);
    window.editor.uploadPhoto();
    window.utils.removeClassName(sortImages, 'img-filters--inactive');

    defaultPhotosButtonSort.addEventListener('click', filterByDefault);

    discussedPhotosButtonSort.addEventListener('click', filterByDiscussedPhotos);

    randomPhotosButtonSort.addEventListener('click', filterByRandomPhotos);

    function filterByDefault() {
      window.gallery.removePhotos();
      window.gallery.renderPhotos(photos);
    }

    function filterByDiscussedPhotos() {
      var discussedPhotos = getDiscussedPhotos(photos);
      window.gallery.removePhotos();
      window.gallery.renderPhotos(discussedPhotos);
    }

    function getDiscussedPhotos(array) {
      var mappedArray = array.map(function(el, i) {
        return { index: i, value: el.comments.length };
      });

      mappedArray.sort(function(a, b) {
        return b.value - a.value;
      });

      var discussedPictures = mappedArray.map(function(el) {
        return array[el.index];
      });

      return discussedPictures;
    }

    function filterByRandomPhotos () {
      var randomPhotos = getArrayGivenLength(photos, window.constants.MAX_LENGTH_GALLERY);
      window.gallery.removePhotos();
      window.gallery.renderPhotos(randomPhotos);
    }

    function getArrayGivenLength(array, length) {
      var randomArray = array.map(function(elem,index) {
        return [elem, Math.random()]
      })
        .sort(function(a,b){
          return a[1] - b[1]
        })
        .map(function(elem){
          return elem[0]
        });
      randomArray.length = length;

      return randomArray;
    }
  }


  window.backend.load(URL, 'GET', onSuccess, onError);
})();
