'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var TIMEOUT = 10000;

  var errorMessages = {
    301: 'Перемещено навсегда',
    302: 'Перемещено временно',
    400: 'Неверный запрос',
    401: 'Не авторизован',
    403: 'Запрещено',
    404: 'Ничего не найдено',
    408: 'Истекло время ожидания',
    418: 'Я - чайник!',
    500: 'Внутренняя ошибка сервера',
    502: 'Ошибочный шлюз',
    503: 'Сервер недоступен',
    504: 'Время ответа сервера истекло'
  };

  function createXMLHttpRequest(url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case SUCCESS_CODE:
          onSuccess(xhr.response);
          break;
        default:
          onError('Cтатус ответа: ' + xhr.status + ' ' + errorMessages[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + TIMEOUT + 'мс');
    });
    xhr.open('GET', url);
    xhr.send();
  }

  window.load = function (url, onSuccess, onError) {
    createXMLHttpRequest(url, onSuccess, onError);
  };
})();
