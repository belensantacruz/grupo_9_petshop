const path =require ("path");

let controller ={
    detalle : (req, res) =>{
        res.render("products/product");
    },
    carrito : (req, res) =>{
        res.render("products/carrito");
    },
    crud: (req, res)=>{
        res.render("crud");
    },
    crudForm: (req, res) =>{
        res.render("crudForm");
    },
    editar: (req, res)=>{
        res.render("editarProducto")
    }
}

module.exports =controller;