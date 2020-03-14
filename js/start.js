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
      console.log(window.gallery.generatePhotos(photos));
    })

    discussedPhotosButtonSort.addEventListener('click', function () {
      var mapped = photos.map(function(el, i) {
        return { index: i, value: el.comments.length };
      });

      mapped.sort(function(a, b) {
        if (a.value > b.value) {
          return -1; }
        if (a.value < b.value) {
          return 1; }
        return 0;
      });

      var result = mapped.map(function(el) {
        return photos[el.index];
      });

      console.log(result);
    })
  }

  window.backend.load(URL, 'GET', onSuccess, onError);
})();
