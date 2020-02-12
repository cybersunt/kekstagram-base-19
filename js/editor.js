'use strict';

// Для формы редактирования загруженной фотографии
// Открываем и закрываем форму
var editingWindow = document.querySelector('.img-upload');
var editingWindowComment = editingWindow.querySelector('.text__description');
var fileUploadButton = editingWindow.querySelector('.img-upload__input');
var previewWindow = editingWindow.querySelector('.img-upload__overlay');
var editingWindowHashtags = editingWindow.querySelector('.text__hashtags');

var closePreviewWindowBtn = editingWindow.querySelector('.img-upload__cancel');
var submitPhotoBtn = editingWindow.querySelector('.img-upload__submit');

fileUploadButton.addEventListener('change', openEditingWindow);

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

// Функция закрытия окна редактирования фото по клику на ESC
function onEditingWindowKeyDown() {
  if (document.activeElement !== editingWindowHashtags && document.activeElement !== editingWindowComment) {
    closeEditingWindow();
  }
}



var DataScale = {
  STEP_RESIZE: 0.25,
  MIN_ZOOM: 0.25,
  MAX_ZOOM: 1
};

var currentZoomValue = 1;

// Работаем с изображениями на форме
var editingWindowFilters = editingWindow.querySelector('.img-upload__preview img');
var filtersList = editingWindow.querySelector('.effects');

function resetFilters() {
  editingWindowComment.value = '';
  editingWindowHashtags.value = '';
  editingWindowFilters.className = 'effects__preview--none';
  pictureZoomingValue.value = currentZoomValue * 100 + '%';
}

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

// Работаем с изображениями на форме
// Добавление фильтра к картинке по клику
filtersList.addEventListener('click', setFilter);

function setFilter(evt) {
  if (evt.target.checked) {
    editingWindowFilters.className = 'effects__preview--' + evt.target.value;
  }
}


