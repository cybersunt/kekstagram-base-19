'use strict';

(function () {
  var overlay = document.querySelector('body');

  function closeInfoMessage(className, evtKeydown) {
    document.querySelector(className).remove();
    document.removeEventListener('keydown', evtKeydown);
  }

  function onErrorMessageCloseKeyDown(evt) {
    if (evt.keyCode === window.constants.KEYCODE_ESC) {
      closeInfoMessage('.error', onErrorMessageCloseKeyDown);
    }
  }

  function onSuccessMessageCloseKeyDown(evt) {
    if (evt.keyCode === window.constants.KEYCODE_ESC) {
      closeInfoMessage('.success', onSuccessMessageCloseKeyDown);
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
      document.addEventListener('keydown', onErrorMessageCloseKeyDown);
    },
    showSuccess: function () {
      renderInfoMessage('#success', '.success');
      document.addEventListener('keydown', onSuccessMessageCloseKeyDown);
    },
  };

})();
