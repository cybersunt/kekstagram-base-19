'use strict';

(function () {
  // Работаем с изображениями на форме
  var editingWindow = document.querySelector('.img-upload');
  var editingWindowFilters = editingWindow.querySelector('.img-upload__preview img');
  var filtersList = editingWindow.querySelector('.effects');
  var filtersButtons = editingWindow.querySelectorAll('.effects__radio');
  var toggleSlider = editingWindow.querySelector('.effect-level__pin');

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
    },
    RESET_FILTER: 'none',
    CURRENT_SATURATION: 0.2
  };

  function getCurrentFilterValue(filter) {
    return (filter.MAX - filter.MIN) * SettingsEffects.CURRENT_SATURATION;
  }

  function resetSaturation() {
    editingWindowFilters.removeAttribute('style');
  }

  function checkUseFilter(filterName) {
    switch (filterName) {
      case SettingsEffects.chrome.NAME:
        editingWindowFilters.style.filter = 'grayscale(' + getCurrentFilterValue(SettingsEffects.chrome) +')';
        break;
      case SettingsEffects.sepia.NAME:
        editingWindowFilters.style.filter = 'sepia(' + getCurrentFilterValue(SettingsEffects.sepia) +')';
        break;
      case SettingsEffects.marvin.NAME:
        editingWindowFilters.style.filter = 'invert(' + getCurrentFilterValue(SettingsEffects.marvin)+'%)';
        break;
      case SettingsEffects.phobos.NAME:
        editingWindowFilters.style.filter = 'blur(' + getCurrentFilterValue(SettingsEffects.phobos) +'px)';
        break;
      case SettingsEffects.heat.NAME:
        editingWindowFilters.style.filter = 'brightness(' + getCurrentFilterValue(SettingsEffects.heat) +')';
        break;
      default:
        resetSaturation();
    }
  }

  function setFilterSaturation() {
   var filterName = filtersList.querySelector('input[checked]').value;
   checkUseFilter(filterName);
  }

  function setFilter(evt) {
    if (evt.target.checked) {
      editingWindowFilters.className = 'effects__preview--' + evt.target.value;
      resetSaturation();
      for (var i = 0; i < filtersButtons.length; i++) {
        filtersButtons[i].removeAttribute('checked');
      }
      evt.target.setAttribute('checked', 'checked');
    }
  }

  var applyFilter = function () {
    filtersList.addEventListener('click', setFilter);
    toggleSlider.addEventListener('mouseup', setFilterSaturation);
  };

  window.filters = {
    applyFilter: applyFilter
  };
})();
