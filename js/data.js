'use strict';

(function () {
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

  window.data = {
    getCurrentData: function () {
      var notes = [];
      for (var j = 1; j < DataPicture.COUNT_PHOTOS + 1; j++) {
        notes.push({
          url: 'photos/' + j + '.jpg',
          likes: getRandomNumber(DataPicture.MIN_LIKES, DataPicture.MAX_LIKES),
          messages: generateMessages(),
          description: getRandomElement(DataPicture.MESSAGES)
        });
      }
      return notes;
    }
  };
})();
