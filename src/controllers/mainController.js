const fs = require('fs')
const path =require ("path");

/* Logica para traer los productos */
let jsonProducts = fs.readFileSync(path.resolve(__dirname, '../db/productos.json'), 'utf-8');
let products = JSON.parse(jsonProducts); //Convertimos el json a array

let controller ={
    home : (req, res) =>{

        let destacado = [];
        let oferta = []

        products.forEach(element => {
            if(element.status == 'destacado'){
                destacado.push(element);
            } else{
                oferta.push(element);
            }
        });
        
        res.render("index", {destacado, oferta});
    }
}

module.exports = controller;