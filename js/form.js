'use strict';

(function () {
  var HashtagsValidationStatus = {
    QUATITY_HASHTAGS: 'Вы можете добавить максимум 5 хэш-тегов',
    SIMILAR_HASHTAGS: 'Хэш-теги должны быть уникальными, невзирая на регистр',
    HASHTAG: 'Хэш-тэг должен начинаться с # и состоять только из букв и цифр. Между хэш-тегами должен быть пробел',
    OK: 'правильно'
  };

  var editingWindow = document.querySelector('.img-upload');
  var editingWindowHashtags = editingWindow.querySelector('.text__hashtags');

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

  function getArrayHashtags(evt) {
    var hashtagsString = removeExtraSpaces(evt.target.value).toLowerCase();
    return splitString(hashtagsString);
  }

  function splitString(stringToSplit) {
    return stringToSplit.split(' ');
  }

  function removeExtraSpaces(string) {
    return string.replace(/\s+/g, ' ').trim();
  }

  function checkQuantityHashtags(array) {
    var MAX_COUNT_HASHTAGS = 5;
    if (array.length > MAX_COUNT_HASHTAGS) {
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

  function checkHashtag(hashtag) {
    var reg = /#([A-Za-z0-9А-Яа-я]{2,19})$/;
    if (!reg.test(hashtag)) {
      return false;
    }
    return true;
  }
})();
