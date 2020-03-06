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

  function createXMLHttpRequest(method, onSuccess, onError) {
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
    return xhr;
  }

  window.backend = {
    load: function (data, method, onSuccess, onError) {
      var xhr = createXMLHttpRequest(method, onSuccess, onError);
      xhr.open(method, data);
      xhr.send();
    },
    upload: function (data, url, method, onSuccess, onError) {
      var xhr = createXMLHttpRequest(method, onSuccess, onError);
      xhr.open(method, url);
      xhr.send(data);
    }
  }
  })();
