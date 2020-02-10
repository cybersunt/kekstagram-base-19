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
// Код клавиш для обработки событий
var KEY_CODE = {
  ENTER: 13,
  ESC: 27
};

var bigPicture = document.querySelector('.big-picture'); // Найдем окно для просмотра фотографий
var usersMessages = bigPicture.querySelector('.social__comments'); // Найдем список всех комментариев к фото
var galleryOverlay = document.querySelector('body');

var closeBigPictureBtn = bigPicture.querySelector('.big-picture__cancel');

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

  picturesList.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('picture__img')) {
      var pictureNumber =  evt.target.dataset.id;
      openBigPicture(arrayPictures, pictureNumber);
    }
  });

  picturesList.addEventListener('keydown', function(evt) {
    if (evt.keyCode === KEY_CODE.ENTER && evt.target.classList.contains('picture')) {
      var pictureNumber = evt.target.querySelector('img').dataset.id;
      openBigPicture(arrayPictures, pictureNumber);
    }
  });

  picturesList.appendChild(fragment);
}

function closeBigPicture() {
  hidePreview();
  hideElement(bigPicture);
  // удаление обработчика клика по кнопке закрытия галереи
  closeBigPictureBtn.removeEventListener('click', onPictureCloseBtnClick);
  // удаление обработчика нажатия на enter по кнопке закрытия галереи
  document.removeEventListener('keydown', onPictureCloseKeyDown);
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

  // добавление обработчика клика по кнопке закрытия галереи
  closeBigPictureBtn.addEventListener('click', onPictureCloseBtnClick);
  // добавление обработчика нажатия на enter по кнопке закрытия галереи
  document.addEventListener('keydown', onPictureCloseKeyDown);
}

function removeChilds(element) {
  element.innerHTML = '';
}

//Клик на кнопке
function onPictureCloseBtnClick() {
  closeBigPicture();
}

//Нажатие на клавишу enter и esc
function onPictureCloseKeyDown (evt) {
  if (evt.keyCode === KEY_CODE.ESC) {
    closeBigPicture();
  }
}

// editor.js
// Для формы редактирования загруженной фотографии
// Открываем и закрываем форму
var editingWindow = document.querySelector('.img-upload');
var editingWindowComment = editingWindow.querySelector('.text__description');
var fileUploadButton = editingWindow.querySelector('.img-upload__input');
var previewWindow = editingWindow.querySelector('.img-upload__overlay');
var editingWindowHashtags = editingWindow.querySelector('.text__hashtags');

var closePreviewWindowBtn = editingWindow.querySelector('.img-upload__cancel');
var submitPhotoBtn = editingWindow.querySelector('.img-upload__submit');

fileUploadButton.addEventListener('change', function(evt) {
  console.log(evt.target);
  if (evt.target.classList.contains('img-upload__input')) {
    openEditingWindow();
  }});

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
  showElement(previewWindow);
  showPreview();
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

// Валидация формы
// Валидация хэштегов
function splitString(stringToSplit) {
  return stringToSplit.split(' ');
}

function removeExtraSpaces(string) {
  return string.replace(/\s+/g, ' ').trim();
}

function getArrayHashtags(evt) {
  var hashtagsString = removeExtraSpaces(evt.target.value).toLowerCase();
  return splitString(hashtagsString);
}

function checkQuantityHashtags(array) {
  var MAX_COUNT_HASHTAGS = 5;
  if (array.length > MAX_COUNT_HASHTAGS) {
    return false;
  }
  return true;
}

function checkHashtag(hashtag) {
  var reg = /#([A-Za-z0-9А-Яа-я]{2,19})$/;
  if (!reg.test(hashtag)) {
    return false;
  }
  return true;
}

function searchSimilarHashtags(array) {
  for (var i = 0; i < array.length - 1; i++) {
    if (array.indexOf(array[i]) !== array.lastIndexOf(array[i])) {
      return false;
    }
  }
  return true;
}

var HashtagsValidationStatus = {
  QUATITY_HASHTAGS: 'Вы можете добавить максимум 5 хэш-тегов',
  SIMILAR_HASHTAGS: 'Хэш-теги должны быть уникальными, невзирая на регистр',
  HASHTAG: 'Хэш-тэг должен начинаться с # и состоять только из букв и цифр. Между хэш-тегами должен быть пробел',
  OK: 'правильно'
};

function checkHashtagsList(evt) {
  var arrayHashtags = getArrayHashtags(evt);

  // Проверяем количество хэштэгов
  if (checkQuantityHashtags(arrayHashtags) === false) {
    return HashtagsValidationStatus.QUATITY_HASHTAGS;
  }

  // проверяем есть ли повторяющиеся хэштэги
  if (searchSimilarHashtags(arrayHashtags) === false) {
    return HashtagsValidationStatus.SIMILAR_HASHTAGS;
  }

  // Проверяем правильно ли хэштэги написаны
  for (var i = 0; i < arrayHashtags.length; i++) {
    if (checkHashtag(arrayHashtags[i]) === false) {
      return HashtagsValidationStatus.HASHTAG;
    }
  }
  // если всё ок
  return HashtagsValidationStatus.OK;
}

editingWindowHashtags.addEventListener('input', function (evt) {
  // сбрасываем статус
  editingWindowHashtags.setCustomValidity('');

  if (evt.target.value !== '') {
    // записываем результат валидации
    var validMessage = checkHashtagsList(evt);

    if (validMessage !== HashtagsValidationStatus.OK) {
      // Если не правильно - записываем статус
      editingWindowHashtags.setCustomValidity(validMessage);
    }
  }
});
