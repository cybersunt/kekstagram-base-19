'use strict';

(function () {
  var galleryOverlay = document.querySelector('body');
  var picturesList = document.querySelector('.pictures'); // Найдем элемент в который мы будем вставлять наши изображения
  var bigPicture = document.querySelector('.big-picture'); // Найдем окно для просмотра фотографий
  var usersMessages = bigPicture.querySelector('.social__comments'); // Найдем список всех комментариев к фото
  var messagesCounter = bigPicture.querySelector('.social__comment-count').textContent; // Найдем счетчик всех комментариев к фото
  var messagesLoader = bigPicture.querySelector('.comments-loader'); // Найдем счетчик всех комментариев к фото
  var countMessages = bigPicture.querySelector('.comments-count');
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
    array.forEach(function (element) {
      fragmentMessage.appendChild(createMessage(element));
    })

    return fragmentMessage;
  }

  // Рендерим фотку, которую будем отркрывать
  function renderPreviewPicture(pictureIndex) {
    var arrayPictures = window.data.getCurrentData();
    var pictureUrl = bigPicture.querySelector('.big-picture__img img');
    var pictureLikes = bigPicture.querySelector('.likes-count');
    var pictureMessagesCount = bigPicture.querySelector('.comments-count');
    var pictureDescription = bigPicture.querySelector('.social__caption');

    pictureUrl.src = arrayPictures[pictureIndex].url;
    pictureLikes.textContent = arrayPictures[pictureIndex].likes;
    pictureMessagesCount.textContent = arrayPictures[pictureIndex].comments.length;
    pictureDescription.textContent = arrayPictures[pictureIndex].description;
  }

  function showMessageList(pictureIndex) {
    var arrayPictures = window.data.getCurrentData();
    var messages = arrayPictures[pictureIndex].comments;
    counterMessages(messages);
  }

  function counterMessages(messages) {

    var commentsCount = 5;

    if (messages.length > commentsCount) {
      var messagesCropped = messages.slice((messages.length - commentsCount), messages.length);
      var fragment = renderMessagesList(messagesCropped);
      usersMessages.append(fragment);
      commentsCount = commentsCount + 5;

      messagesLoader.addEventListener('click', counterMessages)

    } else if (messages.length <= commentsCount) {
      countMessages.textContent = messages.length;
      window.utils.addClassName(messagesLoader, 'hidden');
      var fragment = renderMessagesList(messages);
      usersMessages.append(fragment);
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
      if (evt.target.classList.contains('picture')) {
        evt.preventDefault();
        var pictureNumber = evt.target.querySelector('img').dataset.id;
        window.utils.isEnterEvent(evt, openBigPicture, pictureNumber);
      }
    });
  };

  window.preview = {
    showPhoto: showPhoto
  };
})();
