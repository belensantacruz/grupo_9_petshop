window.addEventListener('load', function() {
    let errores = [];

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
    nombre.addEventListener('change', function() {
        if(nombre.value == "")
            nameErrors.push("Debe ingresar un nombre"); 
        else
            nameErrors = [];
        
        nombre.addEventListener('blur', function() {
            let error = document.querySelector('.crudName .frontError p');
            if(nameErrors.length > 0)
                error.innerHTML = nameErrors;
            else
                error.innerHTML = "";
        });
    });

    let descripcion = document.querySelector('#description');
    descripcion.addEventListener('change', function() {
        if(descripcion.value == "")
            descriptionErrors.push("Debe ingresar una descripción");
        else
            descriptionErrors = [];

        descripcion.addEventListener('blur', function() {
            let error = document.querySelector('.crudDescription .frontError p');
            if(descriptionErrors.length > 0)
                error.innerHTML = descriptionErrors;
            else
                error.innerHTML = "";
        });
    });

    let categoria = document.querySelector('#category');
    categoria.addEventListener('change', function() {
        categoryErrors = [];
        if(categoria.value == "")
            categoryErrors.push("Debe ingresar una categoría válida");
        else if(categoria.value != "" && (categoria.value <= 0 || categoria.value > 5 || isNaN(categoria.value)))
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
    });

    let precio = document.querySelector('#price');
    precio.addEventListener('change', function() {
        priceErrors = [];
        if(precio.value == "")
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
    });

    let rating = document.querySelector('#rating');
    rating.addEventListener("change", function() {
        ratingErrors = [];
        if(rating.value == "")
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
    });

    let status = document.querySelector('#status');
    status.addEventListener('change', function() {
        statusErrors = [];
        if(status.value == "")
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
    });
    
    let stock = document.querySelector('#stock');
    stock.addEventListener('change', function() {
        stockErrors = [];
        if(stock.value == "")
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
    });

    let imagen = document.querySelector('#image');   
    imagen.addEventListener('change', function() {
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
    });

    form.addEventListener('submit', function(e) {
        errores = [];
        errores.push.apply(errores, nameErrors);
        errores.push.apply(errores, descriptionErrors);
        errores.push.apply(errores, categoryErrors);
        errores.push.apply(errores, priceErrors);
        errores.push.apply(errores, ratingErrors);
        errores.push.apply(errores, statusErrors);
        errores.push.apply(errores, stockErrors);
        errores.push.apply(errores, imageErrors);
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