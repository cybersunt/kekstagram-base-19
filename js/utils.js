'use strict';

(function () {

  function getTemplateClone(template, innerSelector) {
    var templateElement = document.querySelector(template);
    var elementToClone = templateElement.querySelector(innerSelector);
    if ('content' in templateElement) {
      elementToClone = templateElement.content.querySelector(innerSelector);
    }
    return elementToClone;
  }

  function onPopupCloseKeyDown(evt, element, childElement) {
    if (evt.keyCode === window.constants.KEYCODE_ESC) {
      element.removeChild(childElement);
    }
  }

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
    isEscEvent: function (evt, action) {
      if (evt.keyCode === window.constants.KEYCODE_ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action, array) {
      if (evt.keyCode === window.constants.KEYCODE_ENTER) {
        action(array);
      }
    },
    renderInfoMessage: function (templateElement, innerSelector, message) {
      var overlay = document.querySelector('body');
      var template = getTemplateClone(templateElement, innerSelector);
      var templateMessage = template.cloneNode(true);
      var templateBtn = templateMessage.querySelector((innerSelector + '__button'));
      overlay.appendChild(templateMessage);

      if (message !== undefined) {
        templateMessage.querySelector(innerSelector + '__title').textContent = message;
      }

      document.addEventListener('keydown', function (evt) {
        onPopupCloseKeyDown(evt, overlay, templateMessage);
      });

      templateBtn.addEventListener('click', function () {
        overlay.removeChild(templateMessage);
        document.removeEventListener('keydown', onPopupCloseKeyDown);
      });
    }
  };
})();
