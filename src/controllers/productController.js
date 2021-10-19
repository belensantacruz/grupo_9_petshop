const path =require ("path");

let controller ={
    detalle : (req, res) =>{
        res.render("products/product");
    },
    carrito : (req, res) =>{
        res.render("products/carrito");
    },
    crud: (req, res)=>{
        res.render("products/crud");
    },
    crudForm: (req, res) =>{
        res.render("products/crudForm");
    },
    editar: (req, res)=>{
        res.render("products/editarProducto")
    }
}

module.exports =controller;