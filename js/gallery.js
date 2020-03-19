'use strict';

(function () {
  var pictures = document.querySelector('.pictures'); // Найдем элемент в который мы будем вставлять наши изображения

  // Клонируем фотографии
  // Генерируем наш шаблон в документ
  function renderPicture(image, pictureIndex) {
    var picturesTemplate = document.querySelector('#picture').content; // Найдем шаблон который мы будем копировать.
    var picturesElement = picturesTemplate.cloneNode(true);

    picturesElement.querySelector('.picture__img').src = image.url;
    picturesElement.querySelector('.picture__likes').textContent = image.likes;
    picturesElement.querySelector('.picture__comments').textContent = image.comments.length;
    picturesElement.querySelector('.picture__img').setAttribute('data-id', pictureIndex);

    return picturesElement;
  }

  window.gallery = {
    renderPhotos: function (photos) {
      var fragment = document.createDocumentFragment();

      photos.forEach(function (element, index) {
        fragment.appendChild(renderPicture(element, index));
      });

      window.preview.showPhoto(photos);

      pictures.appendChild(fragment);
    },
    removePhotos: function () {
      var renderedPictures = pictures.querySelectorAll('.picture');

      renderedPictures.forEach(function (element) {
        element.remove();
      });
    }
  };
})();
