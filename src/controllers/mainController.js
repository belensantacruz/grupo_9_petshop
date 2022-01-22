const { promiseImpl } = require('ejs');
const fs = require('fs')
const path =require ("path");
let db = require('../database/models');

let controller ={
    home : (req, res) =>{

        let destacado = db.Product.findAll({ where: {status: 'destacado'}});
        let oferta = db.Product.findAll({ where: {status: 'oferta'}});

        Promise.all([destacado, oferta])
        .then(resultado => {
            let [destacado, oferta] = resultado; 

            res.render("index", {destacado, oferta});
        })
    
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');
    },

    nosotros: (req, res) => {
        res.render("nosotros");
    }
}

module.exports = controller;