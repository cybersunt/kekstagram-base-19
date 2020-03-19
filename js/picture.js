'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var editingWindow = document.querySelector('.img-upload');
  var fileUploadButton = editingWindow.querySelector('.img-upload__input');
  var previewPicture = editingWindow.querySelector('.img-upload__preview img');

  function uploadFile() {
    var file = fileUploadButton.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewPicture.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  window.picture = {
    uploadFile: uploadFile
  };
})();
