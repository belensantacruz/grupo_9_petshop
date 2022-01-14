window.addEventListener('load', function() {
    let errores = [];
    let regexp = /\s/;
    let nameErrors = [];
    let descriptionErrors = [];
    let categoryErrors = [];
    let priceErrors = [];
    let ratingErrors = [];
    let statusErrors = [];
    let stockErrors = [];
    let imageErrors = [];

    let form = document.querySelector('form');
    let body = document.querySelector('body');

    let nombre = document.querySelector('#name');
    function nameValidator(nombre, nameErrors) {
        if(nombre.value == "" || regexp.test(nombre.value))
            nameErrors.push("Debe ingresar un nombre"); 
        else
            nameErrors = [];
        
        nombre.addEventListener('blur', function() {
            let error = document.querySelector('.crudName .frontError p');
            if(nameErrors.length > 0){
                nameErrors = nameErrors.filter( function( item, index, inputArray ) {
                    return inputArray.indexOf(item) == index;
                });
                error.innerHTML = nameErrors;
            }
            else
                error.innerHTML = "";
        });
    }
    nombre.addEventListener('focus', function() {
        nameValidator(nombre, nameErrors);
    });
    nombre.addEventListener('change', function() {
        nameValidator(nombre, nameErrors);
    });

    let descripcion = document.querySelector('#description');
    function descriptionValidator(descripcion, descriptionErrors) {
        if(descripcion.value == "" || regexp.test(nombre.value))
            descriptionErrors.push("Debe ingresar una descripción");
        else
            descriptionErrors = [];

        descripcion.addEventListener('blur', function() {
            let error = document.querySelector('.crudDescription .frontError p');
            if(descriptionErrors.length > 0){
                descriptionErrors = descriptionErrors.filter( function( item, index, inputArray ) {
                    return inputArray.indexOf(item) == index;
                });
                error.innerHTML = descriptionErrors;
            }                
            else
                error.innerHTML = "";
        });
    }
    descripcion.addEventListener('focus', function() {
        descriptionValidator(descripcion, descriptionErrors);
    });
    descripcion.addEventListener('change', function() {
        descriptionValidator(descripcion, descriptionErrors);
    });

    let categoria = document.querySelector('#category');
    function categoryValidator(categoria, categoryErrors) {
        categoryErrors = [];
        if(categoria.value == "" || regexp.test(nombre.value))
            categoryErrors.push("Debe ingresar una categoría válida");
        else if(categoria.value != "" && (categoria.value <= 0 || categoria.value > 5 || (isNaN(categoria.value) && categoria.value != "")))
            categoryErrors.push("Debe ingresar una categoría del 1 al 5"); 
        else
            categoryErrors = [];

        categoria.addEventListener('blur', function() {
            let error = document.querySelector('.crudCategory .frontError p');
            if(categoryErrors.length > 0){
                categoryErrors = categoryErrors.filter( function( item, index, inputArray ) {
                    return inputArray.indexOf(item) == index;
                });
                error.innerHTML = categoryErrors;
            }
            else
                error.innerHTML = "";
        });
    }
    categoria.addEventListener('focus', function() {
        categoryValidator(categoria, categoryErrors);
    });
    categoria.addEventListener('change', function() {
        categoryValidator(categoria, categoryErrors);
    });

    let precio = document.querySelector('#price');
    function priceValidator(precio, priceErrors) {
        if(precio.value == "" || regexp.test(nombre.value))
            priceErrors.push("Debe ingresar un valor");
        else if(precio.value != "" && isNaN(precio.value))
            priceErrors.push("Debe ingresar un número válido");
        else if(precio.value != "" && precio.value <= 0)
            priceErrors.push("Debe ingresar un número mayor a 0");
        else
            priceErrors = [];

        precio.addEventListener('blur', function() {
            let error = document.querySelector('.crudPrice .frontError p');
            if(priceErrors.length > 0){
                priceErrors = priceErrors.filter( function( item, index, inputArray ) {
                    return inputArray.indexOf(item) == index;
                });
                error.innerHTML = priceErrors;
            }
            else
                error.innerHTML = "";
        });
    }
    precio.addEventListener('focus', function() {
        priceValidator(precio, priceErrors);
    });
    precio.addEventListener('change', function() {
        priceValidator(precio, priceErrors);
    });

    let rating = document.querySelector('#rating');
    function ratingValidator(rating, ratingErrors) {
        if(rating.value == "" || regexp.test(nombre.value))
            ratingErrors.push("Debe ingresar el rating");
        else if(rating.value != "" && (rating.value <= 0 || rating.value > 5 || isNaN(rating.value)))
            ratingErrors.push("Debe ingresar un rating del 1 al 5"); 
        else
            ratingErrors = [];

        rating.addEventListener('blur', function() {
            let error = document.querySelector('.crudRating .frontError p');
            if(ratingErrors.length > 0){
                ratingErrors = ratingErrors.filter( function( item, index, inputArray ) {
                    return inputArray.indexOf(item) == index;
                });
                error.innerHTML = ratingErrors;
            }
            else
                error.innerHTML = "";
        });
    }
    rating.addEventListener("focus", function() {
        ratingValidator(rating, ratingErrors);
    });
    rating.addEventListener("change", function() {
        ratingValidator(rating, ratingErrors);
    });

    let status = document.querySelector('#status');
    function statusValidator(status, statusErrors) {
        if(status.value == "" || regexp.test(nombre.value))
            statusErrors.push("Debe ingresar un status");
        else if(status.value != "" && (status.value != "oferta" && status.value != "destacado"))
            statusErrors.push("Debe ingresar un status válido: oferta o destacado");
        else
            statusErrors = [];

        status.addEventListener('blur', function() {
            let error = document.querySelector('.crudStatus .frontError p');
            if(statusErrors.length > 0){
                statusErrors = statusErrors.filter( function( item, index, inputArray ) {
                    return inputArray.indexOf(item) == index;
                });
                error.innerHTML = statusErrors;
            }
            else
                error.innerHTML = "";
        });
    }
    status.addEventListener('focus', function() {
        statusValidator(status, statusErrors);
    });
    status.addEventListener('change', function() {
        statusValidator(status, statusErrors);
    });
    
    let stock = document.querySelector('#stock');
    function stockValidator(stock, stockErrors) {
        if(stock.value == "" || regexp.test(nombre.value))
            stockErrors.push("Debe ingresar un número");
        else if(stock.value != "" && (isNaN(stock.value) || stock.value <=0))
            stockErrors.push("Debe ingresar un número mayor a 0");
        else
            stockErrors = [];

        stock.addEventListener('blur', function() {
            let error = document.querySelector('.crudStock .frontError p');
            if(stockErrors.length > 0){
                stockErrors = stockErrors.filter( function( item, index, inputArray ) {
                    return inputArray.indexOf(item) == index;
                });
                error.innerHTML = stockErrors;
            }
            else
                error.innerHTML = "";
        });
    }
    stock.addEventListener('focus', function() {
        stockValidator(stock, stockErrors);
    });   
    stock.addEventListener('change', function() {
        stockValidator(stock, stockErrors);
    });     

    let imagen = document.querySelector('#image');
    function imageValidator(imagen, imageErrors) {
        if(imagen.value == "")
            imageErrors.push("Debe seleccionar una imagen");
        else
            imageErrors = [];

        image.addEventListener('blur', function() {
            let error = document.querySelector('.crudImage .frontError p');
            if(imageErrors.length > 0){
                image = imageErrors.filter( function( item, index, inputArray ) {
                    return inputArray.indexOf(item) == index;
                });
                error.innerHTML = imageErrors;
            }
            else
                error.innerHTML = "";
        });
    }
    imagen.addEventListener('focus', function() {
        imageValidator(imagen, imageErrors);
    });
    imagen.addEventListener('change', function() {
        imageValidator(imagen, imageErrors);
    });

    form.addEventListener('submit', function(e) {
        errores = [];
        let frontErrors = document.querySelectorAll('.frontError p');
        frontErrors.forEach(function(item, index) {
            if(frontErrors[index].innerText != "")
                errores.push(frontErrors[index].innerText);
        })

        errores = errores.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });

        if(errores.length > 0){
            e.preventDefault();
            errores.forEach(function(item, index) {
                errores[index] = item + "\n";
            })
            alert(errores.join(""));
        }
    });

    body.addEventListener('keypress', function(e) {
        if(e.key == "Enter")
            e.preventDefault();
    });
})