const path = require ("path");
const fs = require('fs');

/* Leer jsons y parsearlos */
let jsonProducts = fs.readFileSync(path.resolve(__dirname, '../db/products.json'), 'utf-8');
let products = JSON.parse(jsonProducts); //json a array
const nuevoId =()=>{
    let ultimo=0;
    products.forEach(element =>{
        if (element.id > ultimo){
            ultimo=element.id;
        }
    })
        return ultimo +1;
}

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
    agregarProducto : (req, res) => {
        let productoNuevo ={
            id: nuevoId(),
            ... req.body,
           };
            products.push(productoNuevo)
        let jsonProductos= JSON.stringify(products, null, 4);
        fs.writeFileSync(path.resolve(__dirname, "../db/products.json"), jsonProductos);
        res.redirect('/products/crud');
    },

    editar: (req, res)=>{
        let productoAeditar=products.find(function (producto){
            return producto.id==req.params.id
        })
        res.render("products/editarProducto", {productoAeditar});
    },
    update: (req, res) =>{
        products.forEach(producto => {
            if (producto.id == req.params.id){
                producto.name = req.body.name;
                producto.description = req.body.description;
                producto.price = req.body.price;
                producto.image = req.body.image;
                producto.category = req.body.category;
                producto.status = req.body.status;
                console.log(req.body.name);
            }    
        });
        let jsonProducts = JSON.stringify(products, null, 4);
        fs.writeFileSync(path.resolve(__dirname, '../db/products.json'), jsonProducts);

        res.redirect('/products/crud');
    },
    borrar: (req, res) => {
        let nuevaListaProductos = products.filter(item => {
            return item.id != req.params.id;
        });
        let jsonProductos = JSON.stringify(nuevaListaProductos, null, 4);
        fs.writeFileSync(path.resolve(__dirname, "../db/products.json"), jsonProductos);
        res.redirect("/");
    }
}

module.exports =controller;