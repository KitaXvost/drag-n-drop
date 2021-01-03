let dropArea = document.getElementById("drop-area")

// Предотвращение поведения перетаскивания по умолчанию
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
  document.body.addEventListener(eventName, preventDefaults, false)
})

// Выделяем область перетаскивания
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('active')
}

function handleDrop(e) {
  var dt = e.dataTransfer
  var files = dt.files

  handleFiles(files)
}

function handleFiles(files) {
  files = [...files]
  files.forEach(previewFile)
}

function previewFile(file) {
  let reader = new FileReader()
  reader.onload = function(e) {
            // e.target.result содержит всё содержимое файла
            var text = e.target.result;
            uploadData(text);
            };
        // читаем файл
        reader.readAsText(file);
}

function uploadData(text){
var output = $('#output');
$.ajax({
      url: 'decode_json.php',
      type: 'POST',
      data: {text: text},      
      error: function(error){
        output.text('Ошибка!  | ' + error);
      },
      success: function(data){
        output.html(data);
      }
    });
}
