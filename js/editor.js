'use strict';

(function () {
  // Для формы редактирования загруженной фотографии
  var galleryOverlay = document.querySelector('body');

  var editingWindow = document.querySelector('.img-upload');
  var fileUploadButton = editingWindow.querySelector('.img-upload__input');
  var previewWindow = editingWindow.querySelector('.img-upload__overlay');
  var closePreviewWindowBtn = editingWindow.querySelector('.img-upload__cancel');
  var submitPhotoBtn = editingWindow.querySelector('.img-upload__submit');
  var editingWindowFilters = editingWindow.querySelector('.img-upload__preview img');

  var pictureZoomingValue = editingWindow.querySelector('.scale__control--value');
  var editingWindowHashtags = editingWindow.querySelector('.text__hashtags');
  var editingWindowComment = editingWindow.querySelector('.text__description');

  var currentZoomValue = 1;

  fileUploadButton.addEventListener('change', openEditingWindow);

  // Открываем окно редактирования фотографий
  function openEditingWindow() {
    resetFilters();

    window.utils.addClassName(galleryOverlay, 'modal-open');
    window.utils.removeClassName(previewWindow, 'hidden');

    // добавляем обработчик закрытия окна
    closePreviewWindowBtn.addEventListener('click', closeEditingWindow);
    // добавляем обработчик закрытия окна по кнопке отправить
    submitPhotoBtn.addEventListener('submit', closeEditingWindow);
    // добавляем обработчик закрытия окна по клавише ESC
    document.addEventListener('keydown', onEditingWindowKeyDown);
  }

  function resetFilters() {
    editingWindowComment.value = '';
    editingWindowHashtags.value = '';
    editingWindowFilters.className = 'effects__preview--none';
    pictureZoomingValue.value = currentZoomValue * 100 + '%';
  }

  // Функция закрытия окна редактирования фото по клику на ESC
  function onEditingWindowKeyDown() {
    if (document.activeElement !== editingWindowHashtags && document.activeElement !== editingWindowComment) {
      closeEditingWindow();
    }
  }

  // Закрываем окно редактирования фотографий
  function closeEditingWindow() {
    window.utils.addClassName(previewWindow, 'hidden');
    window.utils.removeClassName(galleryOverlay, 'modal-open');
    // удаляем обработчик закрытия окна
    closePreviewWindowBtn.removeEventListener('click', closeEditingWindow);
    // удаляем обработчик закрытия окна по кноаке отправить
    submitPhotoBtn.removeEventListener('submit', closeEditingWindow);
    // удаляем обработчик закрытия окна по клавише ESC
    document.removeEventListener('keydown', onEditingWindowKeyDown);
  }
})();

