const fs = require('fs')
const path =require ("path");

/* Leer jsons y parsearlos */
let jsonProducts = fs.readFileSync(path.resolve(__dirname, '../database/products.json'), 'utf-8');
let products = JSON.parse(jsonProducts); //json a array

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
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = controller;