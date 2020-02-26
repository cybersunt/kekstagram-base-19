'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data11';

  function onError (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  function onSuccess(data) {
    // Сохранияем фотки
    window.data.savePhotos(data);
    // Показываем фотки
    var photos = window.data.getCurrentData();
    window.gallery.generateMockPhotos(photos);
    window.editor.uploadPhoto();
  }

  window.load(URL, onSuccess, onError);
})();
