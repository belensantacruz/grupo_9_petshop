const path =require ("path");

let controller ={
    detalle : (req, res) =>{
        res.render("products/product");
    },
    carrito : (req, res) =>{
<<<<<<< HEAD
        res.render("carrito");
    },
    crud: (req, res)=>{
        res.render("crud");
    },
    crudForm: (req, res) =>{
        res.render("crudForm");
=======
        res.render("products/carrito");
>>>>>>> e6f9947bbb87ca09b29441fcd31ba01c3da5a4af
    }
}

module.exports =controller;