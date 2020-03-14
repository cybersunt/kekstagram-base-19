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
    window.gallery.generatePhotos(photos);
    window.editor.uploadPhoto();
    window.utils.removeClassName(sortImages, 'img-filters--inactive');

    defaultPhotosButtonSort.addEventListener('click', function () {
      window.data.savePhotos(data);
      var photos = window.data.getCurrentData();
      console.log(photos);
    })

    discussedPhotosButtonSort.addEventListener('click', function () {
      var mapped = photos.map(function(el, i) {
        return { index: i, value: el.comments.length };
      });

      mapped.sort(function(a, b) {
        return b.value - a.value;
      });

      var discussedPhotos = mapped.map(function(el) {
        return photos[el.index];
      });

      console.log(discussedPhotos);
    })

    randomPhotosButtonSort.addEventListener('click', function () {
      var randomPhotos = photos.map(function(elem,index) {
        return [elem, Math.random()]
      })
        .sort(function(a,b){
          return a[1] - b[1]
        })
        .map(function(elem){
          return elem[0]
        });
      randomPhotos.length = window.constants.MAX_LENGTH_GALLERY;

      console.log(randomPhotos);
    })
  }

  window.backend.load(URL, 'GET', onSuccess, onError);
})();
