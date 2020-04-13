'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/kekstagram/data';

  function onError(message) {
    window.messages.showError(message);
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
