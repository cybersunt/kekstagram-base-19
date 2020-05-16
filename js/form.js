'use strict';

(function () {
  var editingWindow = document.querySelector('.img-upload');
  var editingWindowHashtags = editingWindow.querySelector('.text__hashtags');

  function checkHashtagsList(evt) {
    var hashtags = getArrayHashtags(evt);

    // Проверяем количество хэштэгов
    if (!checkQuantityHashtags(hashtags)) {
      return window.constants.INVALID_QUATITY_HASHTAGS;
    }

    // проверяем есть ли повторяющиеся хэштэги
    if (!searchSimilarHashtags(hashtags)) {
      return window.constants.INVALID_SIMILAR_HASHTAGS;
    }

    // Проверяем правильно ли хэштэги написаны
    for (var i = 0; i < hashtags.length; i++) {
      if (!checkHashtag(hashtags[i])) {
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
    return !(array.some(function (element) {
      return array.indexOf(element) !== array.lastIndexOf(element);
    }));
  }

  function checkHashtag(hashtag) {
    var reg = /#([A-Za-z0-9А-Яа-я]{2,19})$/;
    return reg.test(hashtag);
  }

  function validateForm(evt) {
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
  }

  var initValidation = function() {
    editingWindowHashtags.addEventListener(`input`, validateForm);
  };

  var breakValidation = function() {
    editingWindowHashtags.removeEventListener(`input`, validateForm);
  };

  window.form = {
    initValidation: initValidation,
    breakValidation: breakValidation
  };
})();



