const path = require ("path");
const fs = require('fs');

/* Leer jsons y parsearlos */
let jsonProducts = fs.readFileSync(path.resolve(__dirname, '../db/productos.json'), 'utf-8');
let products = JSON.parse(jsonProducts); //json a array

let controller ={
    detalle : (req, res) =>{
        res.render("products/product");
    },
    carrito : (req, res) =>{
        res.render("products/carrito");
    },
    crud: (req, res)=>{
        let productos = [];
        products.forEach(element => {
            productos.push(element);
        });
        res.render("products/crud", {productos});
    },
    agregar: (req, res) =>{
        res.render("products/agregarProducto");
    },
    editar: (req, res)=>{
        res.render("products/editarProducto")
    },
    borrar: (req, res) => {
        let nuevaListaProductos = products.filter(item => {
            return item.id != req.params.id;
        });
        let jsonProductos = JSON.stringify(nuevaListaProductos, null, 4);
        fs.writeFileSync(path.resolve(__dirname, "../db/productos.json"), jsonProductos);
        res.redirect("/");
    }
}

module.exports =controller;