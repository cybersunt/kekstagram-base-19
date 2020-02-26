'use strict';

// (function () {
//   var photos = window.data.getCurrentData();
//   window.gallery.generateMockPhotos(photos);
//   window.editor.uploadPhoto();
// })();

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  var onError = function (message) {
    console.error(message);
  };

  var onSuccess = function(data) {
    // Сохранияем фотки
    window.data.savePhotos(data);
    // Показываем фотки
    var photos = window.data.getCurrentData();
    window.gallery.generateMockPhotos(photos);
    window.editor.uploadPhoto();
  }

  window.load(URL, onSuccess, onError);
})();
