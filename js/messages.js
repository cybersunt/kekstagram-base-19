'use strict';

(function () {
  var overlay = document.querySelector('body');

  function closeInfoMessage(className, evtKeydown, evtMouse) {
    var templateMessage = document.querySelector(className);
    console.log(templateMessage);
    document.querySelector(className).remove();
    document.removeEventListener('keydown', evtKeydown);
    document.removeEventListener('click', evtMouse);
  }

  function onSuccessMessageCloseClick() {
    closeInfoMessage('.success', onSuccessMessageCloseKeyDown, onSuccessMessageCloseClick);
  }

  function onErrorMessageCloseClick() {
    closeInfoMessage('.error', onErrorMessageCloseKeyDown, onErrorMessageCloseClick);
  }

  function onErrorMessageCloseKeyDown(evt) {
    if (evt.keyCode === window.constants.KEYCODE_ESC) {
      closeInfoMessage('.error', onErrorMessageCloseKeyDown, onErrorMessageCloseClick);
    }
  }

  function onSuccessMessageCloseKeyDown(evt) {
    if (evt.keyCode === window.constants.KEYCODE_ESC) {
      closeInfoMessage('.success', onSuccessMessageCloseKeyDown, onSuccessMessageCloseClick);
    }
  }

  function renderInfoMessage(templateElement, innerSelector, message) {
    var template = window.utils.getTemplateClone(templateElement, innerSelector);
    var templateMessage = template.cloneNode(true);
    var templateBtn = templateMessage.querySelector((innerSelector + '__button'));
    overlay.appendChild(templateMessage);

    if (message !== undefined) {
      templateMessage.querySelector(innerSelector + '__title').textContent = message;
    }

    templateBtn.addEventListener('click', function () {
      overlay.removeChild(templateMessage);
    });
  }

  window.messages = {
    showError: function (message) {
      renderInfoMessage('#error', '.error', message);
      document.addEventListener('click', onErrorMessageCloseClick);
      document.addEventListener('keydown', onErrorMessageCloseKeyDown);
    },
    showSuccess: function () {
      renderInfoMessage('#success', '.success');
      document.addEventListener('click', onSuccessMessageCloseClick);
      document.addEventListener('keydown', onSuccessMessageCloseKeyDown);
    },
  };

})();
