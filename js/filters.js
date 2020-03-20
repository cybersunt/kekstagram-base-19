'use strict';

(function () {
  // Работаем с изображениями на форме
  var editingWindow = document.querySelector('.img-upload');
  var editingWindowFilters = editingWindow.querySelector('.img-upload__preview img');
  var pictureZoomingValue = editingWindow.querySelector('.scale__control--value');
  var filters = editingWindow.querySelector('.effects');
  var toggleSlider = editingWindow.querySelector('.effect-level__pin');
  var effectsLevel = editingWindow.querySelector('.effect-level');
  var sliderBar = editingWindow.querySelector('.effect-level__line');
  var sliderBarFill = editingWindow.querySelector('.effect-level__depth');

  var currentFilterValue = 1;
  var currentFilter = 'none';

  var settingsEffects = {
    chrome: {
      NAME: 'chrome',
      MIN: 0,
      MAX: 1
    },
    sepia: {
      NAME: 'sepia',
      MIN: 0,
      MAX: 1
    },
    marvin: {
      NAME: 'marvin',
      MIN: 0,
      MAX: 100
    },
    phobos: {
      NAME: 'phobos',
      MIN: 0,
      MAX: 3
    },
    heat: {
      NAME: 'heat',
      MIN: 1,
      MAX: 3
    }
  };

  function getCurrentFilterValue(filter, filterValue) {
    return (filter.MAX - filter.MIN) * filterValue;
  }

  function setDefaultSettings() {
    pictureZoomingValue.value = window.constants.SCALE_PERCENTS + '%';
    editingWindowFilters.removeAttribute('style');
    window.utils.addClassName(effectsLevel, 'hidden');
  }

  function checkUseFilter(filterName, filterValue) {
    switch (filterName) {
      case settingsEffects.chrome.NAME:
        editingWindowFilters.style.filter = 'grayscale(' + getCurrentFilterValue(settingsEffects.chrome, filterValue) + ')';
        break;
      case settingsEffects.sepia.NAME:
        editingWindowFilters.style.filter = 'sepia(' + getCurrentFilterValue(settingsEffects.sepia, filterValue) + ')';
        break;
      case settingsEffects.marvin.NAME:
        editingWindowFilters.style.filter = 'invert(' + getCurrentFilterValue(settingsEffects.marvin, filterValue) + '%)';
        break;
      case settingsEffects.phobos.NAME:
        editingWindowFilters.style.filter = 'blur(' + getCurrentFilterValue(settingsEffects.phobos, filterValue) + 'px)';
        break;
      case settingsEffects.heat.NAME:
        editingWindowFilters.style.filter = 'brightness(' + getCurrentFilterValue(settingsEffects.heat, filterValue) + ')';
        break;
      default:
        setDefaultSettings();
    }
  }

  function setFilter(evt) {
    if (evt.target.checked) {
      window.utils.removeClassName(effectsLevel, 'hidden');
      editingWindowFilters.className = 'effects__preview--' + evt.target.value;
      currentFilter = evt.target.value;
      toggleSlider.style.left = window.constants.DEFAULT_EFFECT_LEVEL;
      sliderBarFill.style.width = window.constants.DEFAULT_EFFECT_LEVEL;
      setFilterSaturation(window.constants.DEFAULT_FILTER_VALUE);
    }
  }


  function setFilterSaturation(filterValue) {
    checkUseFilter(currentFilter, filterValue);
  }

  function onMouseDown(evt) {
    evt.preventDefault();

    var SLIDER_WIDTH = toggleSlider.offsetWidth;

    var LimitMovementX = {
      min: sliderBar.offsetLeft - SLIDER_WIDTH,
      max: sliderBar.offsetLeft + sliderBar.offsetWidth - SLIDER_WIDTH
    };

    var startCoordsX = LimitMovementX.max;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shiftSlider = startCoordsX - moveEvt.clientX;

      var toggleSliderCoord = toggleSlider.offsetLeft - shiftSlider;

      startCoordsX = moveEvt.clientX;

      if (toggleSliderCoord < LimitMovementX.min) {
        toggleSliderCoord = LimitMovementX.min;
      } else if (toggleSliderCoord > LimitMovementX.max) {
        toggleSliderCoord = LimitMovementX.max;
      }

      toggleSlider.style.left = toggleSliderCoord + 'px';
      sliderBarFill.style.width = toggleSliderCoord + 'px';

      currentFilterValue = toggleSliderCoord / (LimitMovementX.max - LimitMovementX.min);
      setFilterSaturation(currentFilterValue);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function applyEffect() {
    filters.addEventListener('click', setFilter);
    toggleSlider.addEventListener('mousedown', onMouseDown);
  }

  window.filters = {
    applyEffect: applyEffect
  };
})();
