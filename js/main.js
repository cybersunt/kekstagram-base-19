'use strict';

//data.js
var DataPicture = {
  COUNT_PHOTOS: 25,
  MIN_LIKES: 15,
  MAX_LIKES: 200,
  MESSAGES: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
  USER_NAMES: ['Артем', 'Игорь', 'Марина', 'Динара', 'Вадим', 'Сергей']
};

var listNotes = generateNotes();
console.log(listNotes);

// Функция, возвращающаая массив объектов записей в блоге
function generateNotes() {
  var notes = [];
  for (var i = 1; i < DataPicture.COUNT_PHOTOS + 1; i++) {
    notes.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(DataPicture.MIN_LIKES, DataPicture.MAX_LIKES),
      messages: generateMessages()
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
      avatars: 'img/avatar-' + listNumbersAvatars[i] + '.jpg',
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
    array.push(i)
  }
  return array
}

console.log(generateArray(10));

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
