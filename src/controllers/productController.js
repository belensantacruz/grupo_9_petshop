const path = require ("path");
const fs = require('fs');
let product = require('../database/models/Product')

let controller ={
    detalle : (req, res) =>{
        product.findByPk(req.params.id)
        .then((resultado) => {
            res.render("products/product", { productDetail: resultado.dataValues });
        })
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
        //jsonProductos= JSON.stringify(products, null, 4);
       // fs.writeFileSync(path.resolve(__dirname, "../database/products.json"), jsonProductos);
       // res.redirect('/products/crud');
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
       // let jsonProducts = JSON.stringify(products, null, 4);
      //  fs.writeFileSync(path.resolve(__dirname, '../database/products.json'), jsonProducts);
        //res.redirect('/products/crud');
    },
    borrar: (req, res) => {
        let nuevaListaProductos = products.filter(item => {
            return item.id != req.params.id;
        });
      //  let jsonProductos = JSON.stringify(nuevaListaProductos, null, 4);
       // fs.writeFileSync(path.resolve(__dirname, "../database/products.json"), jsonProductos);
        //res.redirect("/products/crud");
    }
}

module.exports =controller;