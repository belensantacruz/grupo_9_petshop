window.addEventListener('load', function() {
    let botonMas = document.querySelectorAll(".botones-cantidad .plus");
    let botonMenos = document.querySelectorAll(".botones-cantidad .minus");
    let cantidad = document.querySelectorAll(".botones-cantidad input");
    for(let i = 0; i < cantidad.length; i++){
        botonMas[i].addEventListener('click', function() {
            if(cantidad[i].value >= 0 && cantidad[i].value < 99){
                cantidad[i].value = Number(cantidad[i].value) + 1;
            }
        });
        botonMenos[i].addEventListener('click', function() {
            if(cantidad[i].value > 0)
                cantidad[i].value = Number(cantidad[i].value) - 1;
        });
    };
});