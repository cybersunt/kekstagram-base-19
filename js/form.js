'use strict';

(function () {
  var editingWindow = document.querySelector('.img-upload');
  var editingWindowHashtags = editingWindow.querySelector('.text__hashtags');

  function checkHashtagsList(evt) {
    var arrayHashtags = getArrayHashtags(evt);

    // Проверяем количество хэштэгов
    if (!checkQuantityHashtags(arrayHashtags)) {
      return window.constants.INVALID_QUATITY_HASHTAGS;
    }

    // проверяем есть ли повторяющиеся хэштэги
    if (!searchSimilarHashtags(arrayHashtags)) {
      return window.constants.INVALID_SIMILAR_HASHTAGS;
    }

    // Проверяем правильно ли хэштэги написаны
    for (var i = 0; i < arrayHashtags.length; i++) {
      if (!checkHashtag(arrayHashtags[i])) {
        return window.constants.INVALID_HASHTAG;
      }
    }
    // если всё ок
    return window.constants.HASHTAGS_STATUS_OK;
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
    if (array.length > window.constants.MAX_COUNT_HASHTAGS) {
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

  function validate() {
    editingWindowHashtags.addEventListener('input', function (evt) {
      // сбрасываем статус
      editingWindowHashtags.setCustomValidity('');

      if (evt.target.value !== '') {
        // записываем результат валидации
        var validMessage = checkHashtagsList(evt);

        if (validMessage !== window.constants.HASHTAGS_STATUS_OK) {
          // Если не правильно - записываем статус
          editingWindowHashtags.setCustomValidity(validMessage);
        }
      }
    });
  }
  window.form = {
    validate: validate,
  };
})();
