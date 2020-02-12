'use strict';

(function () {
  var DataScale = {
    STEP_RESIZE: 0.25,
    MIN_ZOOM: 0.25,
    MAX_ZOOM: 1
  };

  var currentZoomValue = 1;

  var editingWindow = document.querySelector('.img-upload');

  var enlargePictureBtn = editingWindow.querySelector('.scale__control--bigger');
  var reducePictureBtn = editingWindow.querySelector('.scale__control--smaller');
  var pictureZoomingValue = editingWindow.querySelector('.scale__control--value');

// Добавление зума
  enlargePictureBtn.addEventListener('click', setScale);
  reducePictureBtn.addEventListener('click', setScale);

  function zoomPicture(zoomValue) {
    if (currentZoomValue < zoomValue && currentZoomValue >= DataScale.MIN_ZOOM) {
      currentZoomValue += DataScale.STEP_RESIZE;
    }
    if (currentZoomValue > zoomValue && currentZoomValue <= DataScale.MAX_ZOOM) {
      currentZoomValue -= DataScale.STEP_RESIZE;
    }
    return currentZoomValue;
  }

  function setScale(evt) {
    var valueZoom;
    if (evt.target.classList.contains('scale__control--smaller')) {
      valueZoom = zoomPicture(DataScale.MIN_ZOOM);
    }

    if (evt.target.classList.contains('scale__control--bigger')) {
      valueZoom = zoomPicture(DataScale.MAX_ZOOM);
    }

    pictureZoomingValue.value = valueZoom * 100 + '%';
    editingWindowFilters.style.transform = 'scale(' + valueZoom + ')';
  }
})();


