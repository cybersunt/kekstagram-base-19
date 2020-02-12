'use strict'

(function () {
  window.utils = {
    addClassName: function(element, className) {
      element.classList.add(className);
    },
    removeClassName: function(element, className) {
      element.classList.remove(className);
    }
  }
})();



