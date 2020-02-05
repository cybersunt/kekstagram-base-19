'use strict';

// data.js
var DataPicture = {
  COUNT_PHOTOS: 25,
  MIN_LIKES: 15,
  MAX_LIKES: 200,
  MIN_AVATAR_NUM: 1,
  MAX_AVATAR_NUM: 6,
  MESSAGES: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
  USER_NAMES: ['Артем', 'Игорь', 'Марина', 'Динара', 'Вадим', 'Сергей']
};

// Функция, возвращающаая массив объектов записей в блоге
function generateNotes() {
  var notes = [];
  for (var i = 1; i < DataPicture.COUNT_PHOTOS + 1; i++) {
    notes.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(DataPicture.MIN_LIKES, DataPicture.MAX_LIKES),
      messages: generateMessages(),
      description: getRandomElement(DataPicture.MESSAGES)
    });
  }
  return notes;
}

// Функция, возвращающаая массив объектов записей в блоге
function generateMessages() {
  var messages = [];

  var countComments = getRandomNumber(DataPicture.MIN_AVATAR_NUM, DataPicture.MAX_AVATAR_NUM - 1);

  for (var i = 0; i < countComments; i++) {
    messages.push({
      avatar: generateSrcImage(),
      name: getRandomElement(DataPicture.USER_NAMES),
      message: getRandomElement(DataPicture.MESSAGES)
    });
  }
  return messages;
}
// Функция, возвращающая url аватара
function generateSrcImage() {
  var numberImage = getRandomNumber(DataPicture.MIN_AVATAR_NUM, DataPicture.MAX_AVATAR_NUM);
  return 'img/avatar-' + numberImage + '.svg';
}

// Функция, возвращающая случайное число в диапазоне
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция, возвращающая случайный элемемент массива
function getRandomElement(array) {
  var randomIndex = getRandomNumber(0, array.length - 1);
  var randomElement = array[randomIndex];
  return randomElement;
}

var listNotes = generateNotes();

// preview.js
var bigPicture = document.querySelector('.big-picture'); // Найдем окно для просмотра фотографий
var usersMessages = bigPicture.querySelector('.social__comments'); // Найдем список всех комментариев к фото
var galleryOverlay = document.querySelector('body');

// var closeBigPictureBtn = bigPicture.querySelector('.big-picture__cancel');

// Генерируем комментарий к фото
function createMessage(comment) {
  var userMessage = createDOMElement('li', 'social__comment');
  var userMessageText = createDOMElement('p', 'social__text');
  var userMessagePicture = createDOMElement('img', 'social__picture');

  userMessageText.textContent = comment.message;

  userMessagePicture.width = 35;
  userMessagePicture.height = 35;
  userMessagePicture.alt = 'Аватар автора фотографии';
  userMessagePicture.src = comment.avatar;

  userMessage.appendChild(userMessagePicture);
  userMessage.appendChild(userMessageText);

  return userMessage;
}

function createDOMElement(tagName, className) {
  var element = document.createElement(tagName);
  element.classList.add(className);

  return element;
}

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

// Код клавиш для обработки событий
var KEY_CODE = {
  ENTER: 13,
  ESC: 27
};

// Генерируем комментарии
function renderMessagesList(array) {
  removeChilds(usersMessages);

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createMessage(array[i]));
  }

  usersMessages.appendChild(fragment);
}

// Клонируем фотографии
// Генерируем наш шаблон в документ
function renderPicture(image, pictureIndex) {
  var picturesTemplate = document.querySelector('#picture').content; // Найдем шаблон который мы будем копировать.
  var picturesElement = picturesTemplate.cloneNode(true);

  picturesElement.querySelector('.picture__img').src = image.url;
  picturesElement.querySelector('.picture__likes').textContent = image.likes;
  picturesElement.querySelector('.picture__comments').textContent = image.messages.length;
  picturesElement.querySelector('.picture img').setAttribute('data-id', pictureIndex);

  return picturesElement;
}

function renderPicturesList(arrayPictures) {
  var picturesList = document.querySelector('.pictures'); // Найдем элемент в который мы будем вставлять наши изображения
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayPictures.length; i++) {
    fragment.appendChild(renderPicture(arrayPictures[i], i));
  }

  picturesList.appendChild(fragment);
}

renderPicturesList(listNotes);

// Открываем первую фотографию
function renderPreviewPicture(arrayPictures, pictureIndex) {
  var pictureUrl = bigPicture.querySelector('.big-picture__img img');
  var pictureLikes = bigPicture.querySelector('.likes-count');
  var pictureMessagesCount = bigPicture.querySelector('.comments-count');
  var pictureDescription = bigPicture.querySelector('.social__caption');

  renderMessagesList(arrayPictures[pictureIndex].messages);
  pictureUrl.src = arrayPictures[pictureIndex].url;
  pictureLikes.textContent = arrayPictures[pictureIndex].likes;
  pictureMessagesCount.textContent = arrayPictures[pictureIndex].messages.length;
  pictureDescription.textContent = arrayPictures[pictureIndex].description;
}

function openBigPicture(arrayPictures, pictureIndex) {
  var messagesCounter = bigPicture.querySelector('.social__comment-count'); // Найдем счетчик всех комментариев к фото
  var messagesLoader = bigPicture.querySelector('.comments-loader'); // Найдем счетчик всех комментариев к фото

  hideElement(messagesCounter);
  hideElement(messagesLoader);
  renderPreviewPicture(arrayPictures, pictureIndex);
  showPreview();
  showElement(bigPicture);
}

function removeChilds(element) {
  element.innerHTML = '';
}

// editor.js
// Для формы редактирования загруженной фотографии
// Открываем и закрываем форму
var editingWindow = document.querySelector('.img-upload');
var editingWindowComment = editingWindow.querySelector('.text-description');
var fileUploadButton = editingWindow.querySelector('.img-upload__input');
var previewWindow = editingWindow.querySelector('.img-upload__overlay');

var closePreviewWindowBtn = editingWindow.querySelector('.img-upload__cancel');
var submitPhotoBtn = editingWindow.querySelector('.img-upload__submit');

fileUploadButton.addEventListener('change', openEditingWindow);

// Функция закрытия окна редактирования фото по клику на ESC
function onEditingWindowKeyDown(evt) {
  if (evt.keyCode === KEY_CODE.ESC && document.activeElement !== editingWindowComment) {
    closeEditingWindow();
  }
}

// Закрываем окно редактирования фотографий
function closeEditingWindow() {
  hideElement(previewWindow);
  hidePreview();
  // удаляем обработчик закрытия окна
  closePreviewWindowBtn.removeEventListener('click', closeEditingWindow);
  // удаляем обработчик закрытия окна по кноаке отправить
  submitPhotoBtn.addEventListener('click', closeEditingWindow);
  // удаляем обработчик закрытия окна по клавише ESC
  document.removeEventListener('keydown', onEditingWindowKeyDown);
  // скрываем форму загрузки изображения
  fileUploadButton.addEventListener('change', openEditingWindow);
}
var enlargePictureBtn = editingWindow.querySelector('.scale__control--bigger');
var reducePictureBtn = editingWindow.querySelector('.scale__control--smaller');
var pictureZoomingValue = editingWindow.querySelector('.scale__control--value');

var currentZoomValue = 1;
var STEP_RESIZE = 0.25;

var MIN_ZOOM = 0.25;
var MAX_ZOOM = 1;

// Работаем с изображениями на форме
var previewPictureFilters = editingWindow.querySelector('.img-upload__preview img');
var filtersList = editingWindow.querySelector('.effects');

function resetFilters() {
  previewPictureFilters.className = 'effects__preview--none';
  pictureZoomingValue.value = currentZoomValue * 100 + '%';
}

// Открываем окно редактирования фотографий
function openEditingWindow() {
  resetFilters();
  showElement(previewWindow);
  showPreview();
  // добавляем обработчик закрытия окна
  closePreviewWindowBtn.addEventListener('click', closeEditingWindow);
  // добавляем обработчик закрытия окна по кноаке отправить
  submitPhotoBtn.addEventListener('click', closeEditingWindow);
  // добавляем обработчик закрытия окна по клавише ESC
  document.addEventListener('keydown', onEditingWindowKeyDown);
  // скрываем форму загрузки изображения
  fileUploadButton.removeEventListener('change', openEditingWindow);
}

showElement(previewWindow);
showPreview();

// Работаем с изображениями на форме
// Добавление фильтра к картинке по клику
filtersList.addEventListener('click', setFilter);

function setFilter(evt) {
  if (evt.target.checked) {
    previewPictureFilters.className = 'effects__preview--' + evt.target.value;
  }
}

// Добавление зума

enlargePictureBtn.addEventListener('click', setScale);
reducePictureBtn.addEventListener('click', setScale);

function zoomPicture(zoomValue) {
  if (currentZoomValue < zoomValue && currentZoomValue >= MIN_ZOOM) {
    return currentZoomValue += STEP_RESIZE;
  }
  if (currentZoomValue > zoomValue && currentZoomValue <= MAX_ZOOM) {
    return currentZoomValue -= STEP_RESIZE;
  }
  return currentZoomValue = zoomValue;
}

function setScale(evt) {
  var valueZoom;
  if (evt.target.classList.contains('scale__control--smaller')) {
    valueZoom = zoomPicture(MIN_ZOOM);
  }

  if (evt.target.classList.contains('scale__control--bigger')) {
    valueZoom = zoomPicture(MAX_ZOOM);
  }

  pictureZoomingValue.value = valueZoom * 100 + '%';
  previewPictureFilters.style.transform = 'scale(' + valueZoom + ')';
}

// Валидация формы
// Добавление обработчика валидации хэштегов
var previewPictureHashtags = editingWindow.querySelector('.text__hashtags');

previewPictureHashtags.addEventListener('input', getHashtags);

// Валидация хэштегов

function splitString(stringToSplit) {
  return stringToSplit.split(' ');
}
function getHashtags(evt) {
  var arrayHashtags = splitString(evt.target.value);
  // for (var i = 0; i < arrayHashtags.length; i++) {
  // }

  // var element = evt.target;
  // console.log(element);
  // if (element.validity.tooShort) {
  //   element.setCustomValidity('Комментарий должен быть не меньше 30-ти символов' );
  // } else if (element.validity.tooLong) {
  //   element.setCustomValidity('Комментарий не должен превышать 100 символов');
  // } else if (element.validity.valueMissing) {
  //   element.setCustomValidity('Введите, пожалуйста, комментарий. Это обязательно поле для заполнения');
  // } else {
  //   element.setCustomValidity('');
  // }
}
