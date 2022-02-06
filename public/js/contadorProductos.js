window.addEventListener('load', function() {
    let botonMas = document.querySelector(".botones-cantidad.active .plus");
    let botonMenos = document.querySelector(".botones-cantidad.active .minus");
    let cantidad = document.querySelector(".botones-cantidad.active input");

    botonMas.addEventListener('click', function() {
        if(cantidad.value >= 0)
            cantidad.value = Number(cantidad.value) + 1;
    });
    botonMenos.addEventListener('click', function() {
        if(cantidad.value > 0)
            cantidad.value = Number(cantidad.value) - 1;
    });
});