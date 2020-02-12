'use strict';

(function (arrayPictures) {

  var bigPicture = document.querySelector('.big-picture'); // Найдем окно для просмотра фотографий
  var usersMessages = bigPicture.querySelector('.social__comments'); // Найдем список всех комментариев к фото
  var galleryOverlay = document.querySelector('body');
  var closeBigPictureBtn = bigPicture.querySelector('.big-picture__cancel');

  var picturesList = document.querySelector('.pictures'); // Найдем элемент в который мы будем вставлять наши изображения
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrayPictures.length; i++) {
    fragment.appendChild(renderPicture(arrayPictures[i], i));
  }

  picturesList.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      var pictureNumber = evt.target.dataset.id;
      openBigPicture(arrayPictures, pictureNumber);
    }
  });

  picturesList.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.KEYCODE.ENTER && evt.target.classList.contains('picture')) {
      evt.preventDefault();
      var pictureNumber = evt.target.querySelector('img').dataset.id;
      openBigPicture(arrayPictures, pictureNumber);
    }
  });

  picturesList.appendChild(fragment);

  // Клонируем фотографии
  // Генерируем наш шаблон в документ
  function renderPicture(image, pictureIndex) {
    var picturesTemplate = document.querySelector('#picture').content; // Найдем шаблон который мы будем копировать.
    var picturesElement = picturesTemplate.cloneNode(true);

    picturesElement.querySelector('.picture__img').src = image.url;
    picturesElement.querySelector('.picture__likes').textContent = image.likes;
    picturesElement.querySelector('.picture__comments').textContent = image.messages.length;
    picturesElement.querySelector('.picture img').setAttribute('data-id', pictureIndex);

    return picturesElement;
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

  function openBigPicture(arrayPictures, pictureIndex) {
    var messagesCounter = bigPicture.querySelector('.social__comment-count'); // Найдем счетчик всех комментариев к фото
    var messagesLoader = bigPicture.querySelector('.comments-loader'); // Найдем счетчик всех комментариев к фото

    window.utils.addClassName(messagesCounter, 'hidden');
    window.utils.addClassName(messagesLoader, 'hidden');

    renderPreviewPicture(arrayPictures, pictureIndex);

    window.utils.addClassName(galleryOverlay, 'modal-open');
    window.utils.removeClassName(bigPicture, 'hidden');

    // добавление обработчика клика по кнопке закрытия галереи
    closeBigPictureBtn.addEventListener('click', onPictureCloseBtnClick);
    // добавление обработчика нажатия на enter по кнопке закрытия галереи
    document.addEventListener('keydown', onPictureCloseKeyDown);
  }

  // Открываем первую фотографию
  function renderPreviewPicture(arrayPictures, pictureIndex) {
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

  // Генерируем комментарии
  function renderMessagesList(array) {
    removeChilds(usersMessages);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createMessage(array[i]));
    }
    usersMessages.appendChild(fragment);
  }

  // Генерируем комментарий к фото
  function createMessage(comment) {
    var userMessage = createDOMElement('li', 'social__comment');
    var userMessageText = createDOMElement('p', 'social__text');
    var userMessagePicture = createDOMElement('img', 'social__picture');

    userMessageText.textContent = comment.message;

    userMessagePicture.width = 35;
    userMessagePicture.height = 35;
    userMessagePicture.alt = 'Аватар автора фотографии';
    userMessagePicture.src = comment.avatar;

    userMessage.appendChild(userMessagePicture);
    userMessage.appendChild(userMessageText);

    return userMessage;
  }

  function createDOMElement(tagName, className) {
    var element = document.createElement(tagName);
    element.classList.add(className);

    return element;
  }

  function removeChilds(element) {
    element.innerHTML = '';
  }

  })(window.data);


