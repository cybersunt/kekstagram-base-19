'use strict';

(function () {
  var galleryOverlay = document.querySelector('body');
  var picturesList = document.querySelector('.pictures'); // Найдем элемент в который мы будем вставлять наши изображения
  var bigPicture = document.querySelector('.big-picture'); // Найдем окно для просмотра фотографий
  var usersMessages = bigPicture.querySelector('.social__comments'); // Найдем список всех комментариев к фото
  var closeBigPictureBtn = bigPicture.querySelector('.big-picture__cancel');

  // Генерируем комментарий к фото
  function createMessage(comment) {
    var userMessage = window.utils.createDOMElement('li', 'social__comment');
    var userMessageText = window.utils.createDOMElement('p', 'social__text');
    var userMessagePicture = window.utils.createDOMElement('img', 'social__picture');

    userMessageText.textContent = comment.message;

    userMessagePicture.width = window.constants.USER_AVATAR_SIZE;
    userMessagePicture.height = window.constants.USER_AVATAR_SIZE;
    userMessagePicture.alt = window.constants.USER_AVATAR_ALT;
    userMessagePicture.src = comment.avatar;

    userMessage.appendChild(userMessagePicture);
    userMessage.appendChild(userMessageText);

    return userMessage;
  }

  // Генерируем комментарии
  function renderMessagesList(array) {
    window.utils.removeChilds(usersMessages);
    var fragmentMessage = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragmentMessage.appendChild(createMessage(array[i]));
    }
    usersMessages.appendChild(fragmentMessage);
  }

  // Рендерим фотку, которую будем отркрывать
  function renderPreviewPicture(pictureIndex) {
    var arrayPictures = window.data.getCurrentData();
    var pictureUrl = bigPicture.querySelector('.big-picture__img img');
    var pictureLikes = bigPicture.querySelector('.likes-count');
    var pictureMessagesCount = bigPicture.querySelector('.comments-count');
    var pictureDescription = bigPicture.querySelector('.social__caption');

    renderMessagesList(arrayPictures[pictureIndex].messages);
    pictureUrl.src = arrayPictures[pictureIndex].url;
    pictureLikes.textContent = arrayPictures[pictureIndex].likes;
    pictureMessagesCount.textContent = arrayPictures[pictureIndex].messages.length;
    pictureDescription.textContent = arrayPictures[pictureIndex].description;
  }

  function openBigPicture(pictureIndex) {
    var messagesCounter = bigPicture.querySelector('.social__comment-count'); // Найдем счетчик всех комментариев к фото
    var messagesLoader = bigPicture.querySelector('.comments-loader'); // Найдем счетчик всех комментариев к фото

    window.utils.addClassName(messagesCounter, 'hidden');
    window.utils.addClassName(messagesLoader, 'hidden');

    renderPreviewPicture(pictureIndex);

    window.utils.addClassName(galleryOverlay, 'modal-open');
    window.utils.removeClassName(bigPicture, 'hidden');

    // добавление обработчика клика по кнопке закрытия галереи
    closeBigPictureBtn.addEventListener('click', onPictureCloseBtnClick);
    // добавление обработчика нажатия на enter по кнопке закрытия галереи
    document.addEventListener('keydown', onPictureCloseKeyDown);
  }

  // Клик на кнопке
  function onPictureCloseBtnClick() {
    closeBigPicture();
  }

  // Нажатие на клавишу enter и esc
  function onPictureCloseKeyDown(evt) {
    if (evt.keyCode === window.constants.KEYCODE_ESC) {
      closeBigPicture();
    }
  }

  function closeBigPicture() {
    window.utils.removeClassName(galleryOverlay, 'modal-open');
    window.utils.addClassName(bigPicture, 'hidden');
    // удаление обработчика клика по кнопке закрытия галереи
    closeBigPictureBtn.removeEventListener('click', onPictureCloseBtnClick);
    // удаление обработчика нажатия на enter по кнопке закрытия галереи
    document.removeEventListener('keydown', onPictureCloseKeyDown);
  }

  var showPhoto = function () {
    picturesList.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('picture__img')) {
        var pictureNumber = evt.target.dataset.id;
        openBigPicture(pictureNumber);
      }
    });

    picturesList.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.constants.KEYCODE.ENTER && evt.target.classList.contains('picture')) {
        evt.preventDefault();
        var pictureNumber = evt.target.querySelector('img').dataset.id;
        openBigPicture(pictureNumber);
      }
    });
  };

  window.preview = {
    showPhoto: showPhoto
  };
})();
