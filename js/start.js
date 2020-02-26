'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  function onError (message) {
    window.utils.renderErrorMessage(message);
  };

  function onSuccess(data) {
    // Сохранияем фотки
    window.data.savePhotos(data);
    // Показываем фотки
    var photos = window.data.getCurrentData();
    window.gallery.generateMockPhotos(photos);
    window.editor.uploadPhoto();
  }

  window.load(URL, onSuccess, onError);
})();
