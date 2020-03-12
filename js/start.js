'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
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
  }

  window.backend.load(URL, 'GET', onSuccess, onError);
})();
