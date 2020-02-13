'use strict';

(function () {

  var currentZoomValue = 1;

  var editingWindow = document.querySelector('.img-upload');
  var editingWindowFilters = editingWindow.querySelector('.img-upload__preview img');

  var enlargePictureBtn = editingWindow.querySelector('.scale__control--bigger');
  var reducePictureBtn = editingWindow.querySelector('.scale__control--smaller');
  var pictureZoomingValue = editingWindow.querySelector('.scale__control--value');

  function zoomPicture(zoomValue) {
    if (currentZoomValue < zoomValue && currentZoomValue >= window.constants.SCALE_MIN_ZOOM) {
      currentZoomValue += window.constants.SCALE_STEP_RESIZE;
    }
    if (currentZoomValue > zoomValue && currentZoomValue <= window.constants.SCALE_MAX_ZOOM) {
      currentZoomValue -= window.constants.SCALE_STEP_RESIZE;
    }
    return currentZoomValue;
  }

  function setScale(evt) {
    var valueZoom;
    if (evt.target.classList.contains('scale__control--smaller')) {
      valueZoom = zoomPicture(window.constants.SCALE_MIN_ZOOM);
    }

    if (evt.target.classList.contains('scale__control--bigger')) {
      valueZoom = zoomPicture(window.constants.SCALE_MAX_ZOOM);
    }

    pictureZoomingValue.value = valueZoom * window.constants.SCALE_PERCENTS + '%';
    editingWindowFilters.style.transform = 'scale(' + valueZoom + ')';
  }

  var zoomPhoto = function() {
    enlargePictureBtn.addEventListener('click', setScale);
    reducePictureBtn.addEventListener('click', setScale);
  }

  window.scale = {
    zoomPhoto: zoomPhoto
  }
})();



