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

    var listComments = getRandomElement(DataPicture.MESSAGES);
    var listNames = getRandomElement(DataPicture.USER_NAMES);
    var listNumbersAvatars = getRandomNumber(DataPicture.MIN_AVATAR_NUM, DataPicture.MAX_AVATAR_NUM);

    for (var i = 0; i < listComments.length; i++) {
      messages.push({
        avatar: 'img/avatar-' + listNumbersAvatars[i] + '.svg',
        name: listNames[i],
        message: listComments[i]
      });
    }
    return messages;
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
