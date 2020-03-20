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
    getTemplateClone: function (template, innerSelector) {
      var templateElement = document.querySelector(template);
      var elementToClone = templateElement.querySelector(innerSelector);
      if ('content' in templateElement) {
        elementToClone = templateElement.content.querySelector(innerSelector);
      }
      return elementToClone;
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === window.constants.KEYCODE_ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action, array) {
      if (evt.keyCode === window.constants.KEYCODE_ENTER) {
        action(array);
      }
    }
  };
})();
