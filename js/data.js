'use strict';

(function () {
  var currentPhotos = null;
  var originalPhotos = null;

  window.data = {
    getOriginalPhotos: function () {
      return originalPhotos;
    },
    saveOriginalPhotos: function (data) {
      originalPhotos = data;
    },
    getCurrentPhotos: function () {
      return currentPhotos;
    },
    savePhotos: function (data) {
      currentPhotos = data;
    }
  };
})();
