'use strict';

function hideElement(element) {
  element.classList.add('hidden');
}

function showElement(element) {
  element.classList.remove('hidden');
}

function showPreview() {
  galleryOverlay.classList.add('modal-open');
}

function hidePreview() {
  galleryOverlay.classList.remove('modal-open');
}

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
  hideElement(previewWindow);
  hidePreview();
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

var enlargePictureBtn = editingWindow.querySelector('.scale__control--bigger');
var reducePictureBtn = editingWindow.querySelector('.scale__control--smaller');
var pictureZoomingValue = editingWindow.querySelector('.scale__control--value');

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
  showPreview();
  showElement(previewWindow);
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

// Добавление зума
enlargePictureBtn.addEventListener('click', setScale);
reducePictureBtn.addEventListener('click', setScale);

function zoomPicture(zoomValue) {
  if (currentZoomValue < zoomValue && currentZoomValue >= DataScale.MIN_ZOOM) {
    currentZoomValue += DataScale.STEP_RESIZE;
  }
  if (currentZoomValue > zoomValue && currentZoomValue <= DataScale.MAX_ZOOM) {
    currentZoomValue -= DataScale.STEP_RESIZE;
  }
  return currentZoomValue;
}

function setScale(evt) {
  var valueZoom;
  if (evt.target.classList.contains('scale__control--smaller')) {
    valueZoom = zoomPicture(DataScale.MIN_ZOOM);
  }

  if (evt.target.classList.contains('scale__control--bigger')) {
    valueZoom = zoomPicture(DataScale.MAX_ZOOM);
  }

  pictureZoomingValue.value = valueZoom * 100 + '%';
  editingWindowFilters.style.transform = 'scale(' + valueZoom + ')';
}
