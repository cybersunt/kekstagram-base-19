'use strict';

(function () {
  var overlay = document.querySelector('body');

  function onErrorMessageBtnCloseClick() {
    removeErrorMessage();
  }

  function onSuccessMessageBtnCloseClick() {
    removeSuccessMessage();
  }

  function onErrorMessageCloseClick(evt) {
    if (evt.target === document.querySelector('.error')) {
      removeErrorMessage();
    }
  }

  function onSuccessMessageCloseClick(evt) {
    if (evt.target === document.querySelector('.success')) {
      removeSuccessMessage();
    }
  }

  function onErrorMessageCloseKeyDown(evt) {
    window.utils.isEscEvent(evt, removeErrorMessage);
  }

  function onSuccessMessageCloseKeyDown(evt) {
    window.utils.isEscEvent(evt, removeSuccessMessage);
  }

  function removeErrorMessage() {
    var message = document.querySelector('.error');
    var messageBtnClose = message.querySelector('.error__button');
    message.remove();

    messageBtnClose.removeEventListener('click', onErrorMessageBtnCloseClick);
    document.removeEventListener('click', onErrorMessageCloseClick);
    document.removeEventListener('keydown', onErrorMessageCloseKeyDown);
  }

  function removeSuccessMessage() {
    var message = document.querySelector('.success');
    var messageBtnClose = message.querySelector('.success__button');
    message.remove();

    messageBtnClose.removeEventListener('click', onErrorMessageBtnCloseClick);
    document.removeEventListener('click', onSuccessMessageCloseClick);
    document.removeEventListener('keydown', onSuccessMessageCloseKeyDown);
  }

  function renderErrorMessage(message) {
    var template = window.utils.getTemplateClone('#error', '.error');
    var templateMessage = template.cloneNode(true);
    var templateBtn = templateMessage.querySelector('.error__button');
    templateMessage.querySelector('.error__title').textContent = message;

    templateBtn.addEventListener('click', onErrorMessageBtnCloseClick);
    document.addEventListener('click', onErrorMessageCloseClick);
    document.addEventListener('keydown', onErrorMessageCloseKeyDown);

    overlay.appendChild(templateMessage);
  }

  function renderSuccessMessage() {
    var template = window.utils.getTemplateClone('#success', '.success');
    var templateMessage = template.cloneNode(true);
    var templateBtn = templateMessage.querySelector('.success__button');

    templateBtn.addEventListener('click', onSuccessMessageBtnCloseClick);
    document.addEventListener('click', onSuccessMessageCloseClick);
    document.addEventListener('keydown', onSuccessMessageCloseKeyDown);

    overlay.appendChild(templateMessage);
  }

  var showError = function (message) {
    renderErrorMessage(message);
  };

  var showSuccess = function () {
    renderSuccessMessage();
  };

  window.messages = {
    showError: showError,
    showSuccess: showSuccess
  };
})();
