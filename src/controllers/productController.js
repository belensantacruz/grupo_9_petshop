const path =require ("path");

let controller ={
    detalle : (req, res) =>{
        res.render("product");
    },
    carrito : (req, res) =>{
        res.render("carrito");
    },
    crud: (req, res)=>{
        res.render("crud");
    },
    crudForm: (req, res) =>{
        res.render("crudForm");
    }
}

module.exports =controller;