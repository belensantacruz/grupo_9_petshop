const path = require ("path");
const fs = require('fs');
let jsonProducts = fs.readFileSync(path.resolve(__dirname, '../db/products.json'), 'utf-8'); //Leer jsons y parsearlos
let products = JSON.parse(jsonProducts); //json a array

//Generar nuevo id:
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
        let producto={
            ...req.body,
        };
        res.render("products/agregarProducto", {producto});
    },
    agregarProducto : (req, res) => {
        let producto = {
            id: nuevoId(),
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
            category: req.body.category,
            status: req.body.status,
            image: req.file == undefined ? producto.image : req.file.originalname
           };
            products.push(producto)
        let jsonProductos= JSON.stringify(products, null, 4);
        fs.writeFileSync(path.resolve(__dirname, "../db/products.json"), jsonProductos);
        res.redirect('/products/crud');
    },

    editar: (req, res)=>{
        let producto=products.find(function (prod) {
            return prod.id==req.params.id
        })
        res.render("products/editarProducto", {producto});
    },
    update: (req, res) =>{
        products.forEach(producto => {
            if (producto.id == req.params.id){
                producto.name = req.body.name;
                producto.description = req.body.description;
                producto.price = parseFloat(req.body.price);
                producto.image = req.file == undefined ? producto.image : req.file.originalname;
                producto.category = req.body.category;
                producto.status = req.body.status;
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