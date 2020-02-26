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
      var errrorText = errorTemplate.querySelector('.error__title');
      var errorButton = errorTemplate.querySelector('.error__button');
      var errorContent = errorTemplate.querySelector('.error__inner');
      errrorText.textContent = message;
      errorContent.removeChild(errorButton);
      overlay.appendChild(errorTemplate.cloneNode(true));
    }
  };
})();
