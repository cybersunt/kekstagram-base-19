'use strict';

(function () {
  // Работаем с изображениями на форме
  var editingWindow = document.querySelector('.img-upload');
  var editingWindowFilters = editingWindow.querySelector('.img-upload__preview img');
  var filtersList = editingWindow.querySelector('.effects');

  // Работаем с изображениями на форме
  // Добавление фильтра к картинке по клику
  filtersList.addEventListener('click', setFilter);

  function setFilter(evt) {
    if (evt.target.checked) {
      editingWindowFilters.className = 'effects__preview--' + evt.target.value;
    }
  }
})();
