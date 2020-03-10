'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data1';
  function onError(message) {
    window.utils.renderInfoMessage('#error', '.error', message);
  }

  function onSuccess(data) {
    // Сохранияем фотки
    window.data.savePhotos(data);
    // Показываем фотки
    var photos = window.data.getCurrentData();
    window.gallery.generatePhotos(photos);
    window.editor.uploadPhoto();
  }

  window.backend.load(URL, 'GET', onSuccess, onError);
})();
