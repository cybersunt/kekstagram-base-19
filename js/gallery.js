'use strict';

(function () {
  var picturesList = document.querySelector('.pictures'); // Найдем элемент в который мы будем вставлять наши изображения

  // Клонируем фотографии
  // Генерируем наш шаблон в документ
  function renderPicture(image, pictureIndex) {
    var picturesTemplate = document.querySelector('#picture').content; // Найдем шаблон который мы будем копировать.
    var picturesElement = picturesTemplate.cloneNode(true);

    picturesElement.querySelector('.picture__img').src = image.url;
    picturesElement.querySelector('.picture__likes').textContent = image.likes;
    picturesElement.querySelector('.picture__comments').textContent = image.comments.length;
    picturesElement.querySelector('.picture img').setAttribute('data-id', pictureIndex);

    return picturesElement;
  }

  window.gallery = {
    renderPhotos: function (arrayPictures) {

      var fragment = document.createDocumentFragment();

      for (var i = 0; i < arrayPictures.length; i++) {
        fragment.appendChild(renderPicture(arrayPictures[i], i));
      }
      window.preview.showPhoto(arrayPictures);

      picturesList.appendChild(fragment);
    },
    removePhotos: function () {
      var picturesRenderList = picturesList.querySelectorAll('.picture');
      for (var i = 0; i < picturesRenderList.length; i++) {
        picturesRenderList[i].remove();
      }

    }
  };
})();
