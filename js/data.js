'use strict';

(function () {
  var currentPhotos = null;

  window.data = {
    getCurrentData: function () {
      return currentPhotos;
    },
    savePhotos: function (data) {
      currentPhotos = data;
    }
  };
})();
