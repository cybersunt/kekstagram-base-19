'use strict';

(function () {
  var galleryOverlay = document.querySelector('body');
  var pictures = document.querySelector('.pictures'); // Найдем элемент в который мы будем вставлять наши изображения
  var bigPicture = document.querySelector('.big-picture'); // Найдем окно для просмотра фотографий
  var usersMessages = bigPicture.querySelector('.social__comments'); // Найдем список всех комментариев к фото
  var messagesCounter = bigPicture.querySelector('.social__comment-count'); // Найдем счетчик всех комментариев к фото
  var pictureMessagesCounter = bigPicture.querySelector('.comments-count'); // Найдем счетчик всех комментариев к фото
  var messagesLoader = bigPicture.querySelector('.comments-loader'); // Найдем счетчик всех комментариев к фото
  var closeBigPictureBtn = bigPicture.querySelector('.big-picture__cancel');

  var currentPictureIndex;
  var commentsCounter;

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
    array.forEach(function (element) {
      fragmentMessage.appendChild(createMessage(element));
    });

    return fragmentMessage;
  }

  // Рендерим фотку, которую будем отркрывать
  function renderPreviewPicture(pictureIndex) {
    var photos = window.data.getCurrentPhotos();

    var pictureUrl = bigPicture.querySelector('.big-picture__img img');
    var pictureLikes = bigPicture.querySelector('.likes-count');
    var pictureDescription = bigPicture.querySelector('.social__caption');

    pictureUrl.src = photos[pictureIndex].url;
    pictureLikes.textContent = photos[pictureIndex].likes;
    pictureMessagesCounter.textContent = photos[pictureIndex].comments.length;
    pictureDescription.textContent = photos[pictureIndex].description;
  }

  function showMessageList(pictureIndex) {
    currentPictureIndex = pictureIndex;
    var photos = window.data.getCurrentPhotos();
    var messages = photos[currentPictureIndex].comments;

    commentsCounter = window.constants.MIN_COMMENTS_COUNT;
    messagesCounter.innerHTML = '';

    checkQuantityComments(messages, commentsCounter);

    if (messages.length > commentsCounter) {
      messagesLoader.addEventListener('click', countMessages);
    }
  }

  function countMessages() {
    commentsCounter = commentsCounter + window.constants.STEP_COMMENTS_COUNT;

    var photos = window.data.getCurrentPhotos();
    var messages = photos[currentPictureIndex].comments;

    checkQuantityComments(messages, commentsCounter);

    if (messages.length <= commentsCounter) {
      messagesLoader.removeEventListener('click', countMessages);
    }
  }

  function checkQuantityComments(messages, pictureCommentsCounter) {
    if (messages.length <= pictureCommentsCounter) {
      pictureMessagesCounter.textContent = messages.length + ' из ' + messages.length + ' комментариев';
      window.utils.addClassName(messagesLoader, 'hidden');
      messagesCounter.appendChild(pictureMessagesCounter);
      usersMessages.appendChild(renderMessagesList(messages));
    }
    if (messages.length > pictureCommentsCounter) {
      pictureMessagesCounter.textContent = pictureCommentsCounter + ' из ' + messages.length + ' комментариев';
      window.utils.removeClassName(messagesLoader, 'hidden');
      var messagesCropped = messages.slice(0, pictureCommentsCounter);
      messagesCounter.appendChild(pictureMessagesCounter);
      usersMessages.appendChild(renderMessagesList(messagesCropped));
    }
  }

  function openBigPicture(pictureIndex) {
    renderPreviewPicture(pictureIndex);
    showMessageList(pictureIndex);

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
    window.utils.isEscEvent(evt, closeBigPicture);
  }

  function closeBigPicture() {
    commentsCounter = undefined;
    window.utils.removeClassName(galleryOverlay, 'modal-open');
    window.utils.addClassName(bigPicture, 'hidden');
    // удаление обработчика клика по кнопке закрытия галереи
    closeBigPictureBtn.removeEventListener('click', onPictureCloseBtnClick);
    // удаление обработчика нажатия на enter по кнопке закрытия галереи
    document.removeEventListener('keydown', onPictureCloseKeyDown);
  }

  var showPhoto = function () {
    pictures.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('picture__img')) {
        var pictureNumber = evt.target.dataset.id;
        openBigPicture(pictureNumber);
      }
    });

    pictures.addEventListener('keydown', function (evt) {
      if (evt.target.classList.contains('picture')) {
        var pictureNumber = evt.target.querySelector('img').dataset.id;
        window.utils.isEnterEvent(evt, openBigPicture, pictureNumber);
      }
    });
  };

  window.preview = {
    showPhoto: showPhoto
  };
})();
