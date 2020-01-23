'use strict';

// data.js
var DataPicture = {
  COUNT_PHOTOS: 25,
  MIN_LIKES: 15,
  MAX_LIKES: 200,
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

  var listComments = getArrayLength(shuffleArray(DataPicture.MESSAGES));
  var listNames = shuffleArray(DataPicture.USER_NAMES);
  var listNumbersAvatars = shuffleArray(generateArray(DataPicture.USER_NAMES.length));

  for (var i = 0; i < listComments.length; i++) {
    messages.push({
      avatar: 'img/avatar-' + listNumbersAvatars[i] + '.svg',
      name: listNames[i],
      message: listComments[i]
    });
  }
  return messages;
}

// Функция, возвращающаая массив произвольной длины из чисел
function generateArray(arrayLength) {
  var array = [];
  for (var i = 1; i < arrayLength + 1; i++) {
    array.push(i);
  }
  return array;
}

// Функция, возвращающая случайное число в диапазоне
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция, создающая массив произвольной длины
function getArrayLength(array) {
  var clone = array.slice();
  clone.length = getRandomNumber(1, array.length - 1);
  return clone;
}

// Функция, возвращающая массив в случайном порядке
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var tempValue = array[i];
    array[i] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
}

// Функция, возвращающая случайный элемемент массива
function getRandomElement(array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
  }
  var randomElement = array[randomIndex];
  return randomElement;
}

var listNotes = generateNotes();

// pictures.js
var bigPicture = document.querySelector('.big-picture'); // Найдем окно для просмотра фотографий
var usersMessages = bigPicture.querySelector('.social__comments'); // Найдем список всех комментариев к фото

// Генерируем наш шаблон в документ
function renderPicture(image) {
  var picturesTemplate = document.querySelector('#picture').content; // Найдем шаблон который мы будем копировать.
  var picturesElement = picturesTemplate.cloneNode(true);

  picturesElement.querySelector('.picture__img').src = image.url;
  picturesElement.querySelector('.picture__likes').textContent = image.likes;
  picturesElement.querySelector('.picture__comments').textContent = image.messages;
  return picturesElement;
}

// Клонируем фотографии
function renderPicturesList() {
  var picturesList = document.querySelector('.pictures'); // Найдем элемент в который мы будем вставлять наши изображения
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < listNotes.length; i++) {
    fragment.appendChild(renderPicture(listNotes[i]));
  }
  picturesList.appendChild(fragment);
}

// Генерируем комментарий к фото
function createMessage(comment) {
  var userMessage = document.createElement('li');
  userMessage.classList.add('social__comment');

  var userMessageText = document.createElement('p');
  userMessageText.classList.add('social__text');
  userMessageText.textContent = comment.message;

  var userMessagePicture = document.createElement('img');
  userMessagePicture.classList.add('social__picture');
  userMessagePicture.width = 35;
  userMessagePicture.height = 35;
  userMessagePicture.alt = 'Аватар автора фотографии';
  userMessagePicture.src = comment.avatar;

  userMessage.appendChild(userMessagePicture);
  userMessage.appendChild(userMessageText);

  return userMessage;
}

function hideInvisibleElement(element) {
  element.classList.add('visually-hidden');
}

function showElement(element) {
  element.classList.remove('hidden');
}

// Генерируем комментарии
function renderMessagesList(array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createMessage(array[i]));
  }

  usersMessages.appendChild(fragment);
}

// Открываем первую фотографию
function openBigPicture(picture) {
  var messagesCounter = bigPicture.querySelector('.social__comment-count'); // Найдем счетчик всех комментариев к фото
  var messagesLoader = bigPicture.querySelector('.comments-loader'); // Найдем счетчик всех комментариев к фото

  hideInvisibleElement(messagesCounter);
  hideInvisibleElement(messagesLoader);
  removeChilds(usersMessages);
  renderMessagesList(picture.messages);

  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.messages.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  showElement(bigPicture);

  function removeChilds(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}

renderPicturesList();
openBigPicture(listNotes[0]);
