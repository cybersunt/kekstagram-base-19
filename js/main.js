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

  // Функция, возвращающаая массив объектов записей в блоге
  function generateMessages() {
    var messages = [];

    var countComments = getRandomNumber(DataPicture.MIN_AVATAR_NUM, DataPicture.MAX_AVATAR_NUM - 1);

    for (var j = 0; j < countComments; j++) {
      messages.push({
        avatar: generateSrcImage(DataPicture.MIN_AVATAR_NUM, DataPicture.MAX_AVATAR_NUM),
        name: getRandomElement(DataPicture.USER_NAMES),
        message: getRandomElement(DataPicture.MESSAGES)
      });
    }
    return messages;
  }
  // Функция, возвращающая url аватара
  function generateSrcImage(min, max) {
    return 'img/avatar-' + getRandomNumber(min, max) + '.svg';
  }

  // Функция, возвращающая случайное число в диапазоне
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Функция, возвращающая случайный элемемент массива
  function getRandomElement(array) {
    var randomIndex = getRandomNumber(1, array.length - 1);
    var randomElement = array[randomIndex];
    return randomElement;
  }
}

var listNotes = generateNotes();

// gallery.
// Клонируем фотографии
function renderPicturesList(arrayPictures) {
  var picturesList = document.querySelector('.pictures'); // Найдем элемент в который мы будем вставлять наши изображения
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayPictures.length; i++) {
    fragment.appendChild(renderPicture(arrayPictures[i]));
  }
  picturesList.appendChild(fragment);

  // Генерируем наш шаблон в документ
  function renderPicture(image) {
    var picturesTemplate = document.querySelector('#picture').content; // Найдем шаблон который мы будем копировать.
    var picturesElement = picturesTemplate.cloneNode(true);

    picturesElement.querySelector('.picture__img').src = image.url;
    picturesElement.querySelector('.picture__likes').textContent = image.likes;
    picturesElement.querySelector('.picture__comments').textContent = image.messages.length;
    return picturesElement;
  }
}

renderPicturesList(listNotes);

// preview.js
var bigPicture = document.querySelector('.big-picture'); // Найдем окно для просмотра фотографий
var usersMessages = bigPicture.querySelector('.social__comments'); // Найдем список всех комментариев к фото

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

openBigPicture(listNotes[0]);
