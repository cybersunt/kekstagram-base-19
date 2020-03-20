'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  function onError(message) {
    window.utils.renderInfoMessage('#error', '.error', message);
  }

  function onSuccess(data) {
    // Сохранияем фотки
    window.data.savePhotos(data);
    window.data.saveOriginalPhotos(data);
    var photos = window.data.getOriginalPhotos();
    // Показываем фотки
    window.gallery.renderPhotos(photos);
    window.editor.uploadPhoto();
    window.sorting.init(photos);
  }

  window.backend.load(URL, 'GET', onSuccess, onError);
})();
