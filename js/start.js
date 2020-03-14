'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  var sortImages = document.querySelector('.img-filters');
  var defaultPhotosButtonSort = sortImages.querySelector('#filter-default');
  var randomPhotosButtonSort = sortImages.querySelector('#filter-random');
  var discussedPhotosButtonSort = sortImages.querySelector('#filter-discussed');

  function getRank(photos) {
    var commentsLength  = photos.map(function (it) {
      return it.comments.length;
    });
    return commentsLength;
  }



  function onError(message) {
    window.utils.renderInfoMessage('#error', '.error', message);
  }

  function onSuccess(data) {
    // Сохранияем фотки
    window.data.savePhotos(data);
    var photos = window.data.getCurrentData();
    // Показываем фотки
    window.gallery.generatePhotos(photos);
    window.editor.uploadPhoto();
    window.utils.removeClassName(sortImages, 'img-filters--inactive');

    console.log(getRank(photos))

    discussedPhotosButtonSort.addEventListener('click', function (evt) {
      console.log(photos.sort(function (left, right) {
        return getRank(right) - getRank(left);
      }));
    })
  }

  window.backend.load(URL, 'GET', onSuccess, onError);
})();
