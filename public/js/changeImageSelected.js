function onFileSelected(event) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();
  
    var imgtag = document.getElementById("selectedImage");
    var labelImg = document.querySelector(".tituloImagen");
    imgtag.title = selectedFile.name;
  
    reader.onload = function(event) {
      imgtag.src = event.target.result;
    };
    imgtag.src = "/images/products/" + selectedFile.name;
    labelImg.innerHTML = selectedFile.name;
    reader.readAsDataURL(selectedFile);
    imgtag.hidden = false;
    labelImg.hidden = false;
  }