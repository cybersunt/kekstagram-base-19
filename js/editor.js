'use strict';

(function () {

  var URL = 'https://javascript.pages.academy/kekstagram/';

  var galleryOverlay = document.querySelector('body');

  var editingWindow = document.querySelector('.img-upload');
  var fileUploadButton = editingWindow.querySelector('.img-upload__input');
  var previewWindow = editingWindow.querySelector('.img-upload__overlay');
  var effectsLevel = editingWindow.querySelector('.effect-level');
  var closePreviewWindowBtn = editingWindow.querySelector('.img-upload__cancel');
  var editingForm = editingWindow.querySelector('.img-upload__form');
  var submitPhotoBtn = editingWindow.querySelector('.img-upload__submit');
  var editingWindowFilters = editingWindow.querySelector('.img-upload__preview img');
  var pictureZoomingValue = editingWindow.querySelector('.scale__control--value');
  var editingWindowHashtags = editingWindow.querySelector('.text__hashtags');
  var editingWindowComment = editingWindow.querySelector('.text__description');

  function resetSettings() {
    editingWindowComment.value = ``;
    editingWindowHashtags.value = ``;
    editingWindowFilters.style = null;
    editingWindowFilters.className = `effects__preview--none`;
    pictureZoomingValue.value = window.constants.SCALE_PERCENTS + `%`;
    window.utils.addClassName(effectsLevel, `hidden`);
  }

  // Функция закрытия окна редактирования фото по клику на ESC
  function onEditingWindowKeyDown(evt) {
    if (document.activeElement !== editingWindowHashtags && document.activeElement !== editingWindowComment) {
      window.utils.isEscEvent(evt, closeEditingWindow);
    }
  }

  function sendData(evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(editingForm), URL, 'POST', onSuccess, onError);
  }

  function onSuccess() {
    closeEditingWindow();
    window.messages.showSuccess();
  }

  function onError(message) {
    closeEditingWindow();
    window.messages.showError(message);
  }

  // Закрываем окно редактирования фотографий
  function closeEditingWindow() {
    fileUploadButton.value = '';
    window.utils.addClassName(previewWindow, 'hidden');
    window.utils.removeClassName(galleryOverlay, 'modal-open');

    window.form.breakValidation();
    window.filters.cancelEffect();
    window.scale.removeZoomPhoto();

    // удаляем обработчик закрытия окна
    closePreviewWindowBtn.removeEventListener('click', closeEditingWindow);
    // удаляем обработчик закрытия окна по кноаке отправить
    submitPhotoBtn.removeEventListener('submit', closeEditingWindow);
    // добавляем обработчик закрытия окна по кнопке отправить
    editingForm.removeEventListener('submit', sendData);
    // удаляем обработчик закрытия окна по клавише ESC
    document.removeEventListener('keydown', onEditingWindowKeyDown);
  }

  // Открываем окно редактирования фотографий
  function openEditingWindow() {
    resetSettings();
    window.utils.addClassName(effectsLevel, 'hidden');
    window.utils.addClassName(galleryOverlay, 'modal-open');
    window.utils.removeClassName(previewWindow, 'hidden');

    window.picture.uploadFile();

    window.form.initValidation();
    window.filters.applyEffect();
    window.scale.addZoomPhoto();

    // добавляем обработчик закрытия окна
    closePreviewWindowBtn.addEventListener('click', closeEditingWindow);
    // добавляем обработчик закрытия окна по кнопке отправить
    editingForm.addEventListener('submit', sendData);
    // добавляем обработчик закрытия окна по кнопке отправить
    submitPhotoBtn.addEventListener('submit', closeEditingWindow);

    // добавляем обработчик закрытия окна по клавише ESC
    document.addEventListener('keydown', onEditingWindowKeyDown);
  }

  function uploadPhoto() {
    fileUploadButton.addEventListener('change', openEditingWindow);
  }

  window.editor = {
    uploadPhoto: uploadPhoto
  };
})();
