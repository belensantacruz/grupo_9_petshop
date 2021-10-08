const path =require ("path");

let controller ={
    detalle : (req, res) =>{
        res.render("product");
    },
    carrito : (req, res) =>{
        res.render("carrito");
    }

}

module.exports =controller;