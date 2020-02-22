'use strict';

(function () {
  // Работаем с изображениями на форме
  var editingWindow = document.querySelector('.img-upload');
  var editingWindowFilters = editingWindow.querySelector('.img-upload__preview img');
  var filtersList = editingWindow.querySelector('.effects');
  var filtersButtons = editingWindow.querySelectorAll('.effects__radio');
  var toggleSlider = editingWindow.querySelector('.effect-level__pin');
  var sliderBar = editingWindow.querySelector('.effect-level__line');
  var sliderBarFill = editingWindow.querySelector('.effect-level__depth');

  var currentFilterValue = 0.2;
  var currentFilter = 'none';

  var SettingsEffects = {
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

  function getCurrentFilterValue(filter, currentFilterValue) {
    return (filter.MAX - filter.MIN) * currentFilterValue;
  }

  function resetSaturation() {
    editingWindowFilters.removeAttribute('style');
  }

  function checkUseFilter(filterName, currentFilterValue) {
    switch (filterName) {
      case SettingsEffects.chrome.NAME:
        editingWindowFilters.style.filter = 'grayscale(' + getCurrentFilterValue(SettingsEffects.chrome, currentFilterValue) + ')';
        break;
      case SettingsEffects.sepia.NAME:
        editingWindowFilters.style.filter = 'sepia(' + getCurrentFilterValue(SettingsEffects.sepia, currentFilterValue) + ')';
        break;
      case SettingsEffects.marvin.NAME:
        editingWindowFilters.style.filter = 'invert(' + getCurrentFilterValue(SettingsEffects.marvin, currentFilterValue) + '%)';
        break;
      case SettingsEffects.phobos.NAME:
        editingWindowFilters.style.filter = 'blur(' + getCurrentFilterValue(SettingsEffects.phobos, currentFilterValue) + 'px)';
        break;
      case SettingsEffects.heat.NAME:
        editingWindowFilters.style.filter = 'brightness(' + getCurrentFilterValue(SettingsEffects.heat, currentFilterValue) + ')';
        break;
      default:
        resetSaturation();
    }
  }

  function setFilter(evt) {
    if (evt.target.checked) {
      editingWindowFilters.className = 'effects__preview--' + evt.target.value;
      resetSaturation();
      currentFilter = evt.target.value;
    }
  }


  function setFilterSaturation(currentFilterValue) {
    checkUseFilter(currentFilter, currentFilterValue);
  }

  function onMouseDown(evt) {
    evt.preventDefault();

    var SLIDER_WIDTH = toggleSlider.offsetWidth;

    var LimitMovementX = {
      min: sliderBar.offsetLeft - SLIDER_WIDTH,
      max: sliderBar.offsetLeft + sliderBar.offsetWidth - SLIDER_WIDTH
    };

    var startCoordsX = evt.clientX;

    function onMouseMove (moveEvt) {
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

      currentFilterValue = toggleSliderCoord/(LimitMovementX.max - LimitMovementX.min);
      setFilterSaturation(currentFilterValue);
    };

    function onMouseUp (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  var applyFilter = function () {
    filtersList.addEventListener('click', setFilter);
    toggleSlider.addEventListener('mousedown', onMouseDown);
  };

  window.filters = {
    applyFilter: applyFilter
  };
})();
