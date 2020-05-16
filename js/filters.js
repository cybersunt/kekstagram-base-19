'use strict';

(function () {
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

  function setFilter(evt) {
    if (evt.target.checked) {
      currentFilter = evt.target.value;
      editingWindowFilters.className = 'effects__preview--' + currentFilter;
      toggleSlider.style.left = window.window.constants.DEFAULT_EFFECT_LEVEL;
      sliderBarFill.style.width = window.window.constants.DEFAULT_EFFECT_LEVEL;
      window.utils.removeClassName(effectsLevel, 'hidden');
      checkUseFilter(currentFilter);
    }
  }

  function getCurrentFilterValue(filter) {
    return filter.MIN + (filter.MAX - filter.MIN) * currentFilterValue;
  }

  function setDefaultSettings() {
    pictureZoomingValue.value = window.window.constants.SCALE_PERCENTS + '%';
    editingWindowFilters.style = null;
    window.utils.addClassName(effectsLevel, 'hidden');
  }

  function checkUseFilter(filterName) {
    var switchFilters = {
      'chrome': 'grayscale(' + getCurrentFilterValue(settingsEffects.chrome) + ')',
      'sepia': 'sepia(' + getCurrentFilterValue(settingsEffects.sepia) + ')',
      'marvin': 'invert(' + getCurrentFilterValue(settingsEffects.marvin) + '%)',
      'phobos': 'blur(' + getCurrentFilterValue(settingsEffects.phobos) + 'px)',
      'heat': 'brightness(' + getCurrentFilterValue(settingsEffects.heat) + ')'
    };

    if (filterName !== window.constants.DEFAULT_FILTER_NAME) {
      editingWindowFilters.style.filter = switchFilters[filterName];
    } else {
      setDefaultSettings();
    }
  }

  function onMouseDown(evt) {
    evt.preventDefault();

    var SLIDER_WIDTH = toggleSlider.offsetWidth;

    var LimitMovementX = {
      min: sliderBar.offsetLeft - SLIDER_WIDTH,
      max: sliderBar.offsetLeft + sliderBar.offsetWidth - SLIDER_WIDTH
    };

    var startCoordsX = evt.clientX;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shiftSlider = startCoordsX - moveEvt.clientX;

      var toggleSliderCoord = toggleSlider.offsetLeft - shiftSlider;

      startCoordsX = moveEvt.clientX;

      if (toggleSliderCoord < LimitMovementX.min) {
        toggleSliderCoord = LimitMovementX.min;
      }
      if (toggleSliderCoord > LimitMovementX.max) {
        toggleSliderCoord = LimitMovementX.max;
      }

      toggleSlider.style.left = toggleSliderCoord + 'px';
      sliderBarFill.style.width = toggleSliderCoord + 'px';

      currentFilterValue = toggleSliderCoord / (LimitMovementX.max - LimitMovementX.min);
      checkUseFilter(currentFilter);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  var applyEffect = function () {
    filters.addEventListener('click', setFilter);
    toggleSlider.addEventListener('mousedown', onMouseDown);
  };

  var cancelEffect = function () {
    filters.removeEventListener('click', setFilter);
    toggleSlider.removeEventListener('mousedown', onMouseDown);
  };

  window.filters = {
    applyEffect: applyEffect,
    cancelEffect: cancelEffect
  };

})();

