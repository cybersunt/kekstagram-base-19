'use strict';

(function () {
  var photos = window.data.getCurrentData();
  window.gallery.generateMockPhotos(photos);
  window.editor.uploadPhoto();
})();

