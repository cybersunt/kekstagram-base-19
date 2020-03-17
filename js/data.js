'use strict';

(function () {
  var currentPhotos = null;
  var originalPhotos = null;

  window.data = {
    getOriginalData: function () {
      return originalPhotos;
    },
    saveOriginalPhotos: function (data) {
      originalPhotos = data;
    },
    getCurrentData: function () {
      return currentPhotos;
    },
    savePhotos: function (data) {
      currentPhotos = data;
    }
  };
})();
