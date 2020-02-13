'use strict';

(function () {
  var photos = window.data.getCurrentData();
  window.gallery.renderPictures(photos);
  window.editor.uploadPhoto();
})();

