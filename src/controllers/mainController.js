const fs = require('fs')
const path =require ("path");
let db = require('../database/models');

let controller ={
    home : (req, res) =>{

        let destacado = [];
        let oferta = []

        // products.forEach(element => {
        //     if(element.status == 'destacado'){
        //         destacado.push(element);
        //     } else{
        //         oferta.push(element);
        //     }
        // });
        
        db.Product.findAll({ where: {status: 'destacado'}})
        .then((resultado) => {
            destacado = resultado;
        })

        db.Product.findAll({ where: {status: 'oferta'}})
        .then((resultado) => {
            oferta = resultado;
        })

        console.log(destacado);
        console.log(oferta);

        res.render("index", {destacado, oferta})
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = controller;