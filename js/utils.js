'use strict';

(function () {
  window.utils = {
    addClassName: function (element, className) {
      element.classList.add(className);
    },
    removeClassName: function (element, className) {
      element.classList.remove(className);
    },
    removeChilds: function (element) {
      element.innerHTML = '';
    },
    createDOMElement: function (tagName, className) {
      var element = document.createElement(tagName);
      element.classList.add(className);
      return element;
    },
    renderErrorMessage: function (message) {
      var overlay = document.querySelector('body');
      var errorTemplate = document.querySelector('#error').content;
      var errorText = errorTemplate.querySelector('.error__title');
      errorText.textContent = message;
      overlay.appendChild(errorTemplate.cloneNode(true));
    }
  };
})();
