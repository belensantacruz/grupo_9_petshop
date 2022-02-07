const path = require ("path");
const fs = require('fs');
let db = require('../database/models')
const { validationResult } = require('express-validator');

let controller ={
    detalle : (req, res) =>{
        let categoryName;
        db.Product.findByPk(req.params.id)
            .then((resultado) => {
                db.Category.findByPk(resultado.dataValues.category_id)
                .then(categoria => {
                    categoryName = categoria.name;
                    res.render("products/product", { productDetail: resultado.dataValues, categoryName });
                });
            });
    },
    carrito : (req, res) =>{
        res.render("products/carrito");
    },
    crud: (req, res)=>{
        if(req.session.loggedUser && req.session.loggedUser.isadmin)
        {
            db.Product.findAll()
                .then(resultado => {
                    db.Category.findAll()
                        .then(itemCategory => {
                            res.render("products/crud", { productos: resultado, categorias: itemCategory });
                        });
                });
            }
    },
    agregar: (req, res) =>{
        if(req.session.loggedUser && req.session.loggedUser.isadmin)
        {
            let producto = {
                ...req.body,
            };
            res.render("products/agregarProducto", { producto });
        }
    },
    agregarProducto : (req, res) => {
        if(req.session.loggedUser && req.session.loggedUser.isadmin)
        {
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                res.render("products/agregarProducto", {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    producto: { ...req.body, }
                });
            }
            else{
                db.Product.findOrCreate({
                    where: {
                        name: req.body.name,
                        description: req.body.description,
                        price: parseFloat(req.body.price),
                        category_id: req.body.category,
                        rating: req.body.rating,
                        status: req.body.status,
                        stock: req.body.stock,
                        image: req.file == undefined ? producto.dataValues.image : req.file.filename
                    }
                })
                    .then((resultado) =>{
                        res.redirect("crud");
                    });
            }
        }
    },

    editar: (req, res)=>{
        if(req.session.loggedUser && req.session.loggedUser.isadmin)
        {
            db.Product.findByPk(req.params.id)
                .then((resultado) => {
                    res.render("products/editarProducto", { producto: resultado });
                });
        }
    },

    update: (req, res) =>{
        if(req.session.loggedUser && req.session.loggedUser.isadmin)
        {
            db.Product.findByPk(req.params.id)
            .then((resultado) => {
                const resultValidation = validationResult(req);
                if (resultValidation.errors.length > 0) {
                    res.render("products/editarProducto", {
                        errors: resultValidation.mapped(),
                        oldData: req.body,
                        producto: resultado
                    });
                }
                else{
                    db.Product.findByPk(req.params.id)
                        .then((result) => {
                            db.Product.update({
                                name: req.body.name,
                                description: req.body.description,
                                price: parseFloat(req.body.price),
                                image: req.file == undefined ? result.dataValues.image : req.file.filename,
                                category_id: req.body.category,
                                rating: req.body.rating,
                                status: req.body.status,
                                stock: req.body.stock
                            }, { where: { id: req.params.id } })
                                .then((resultado) => {
                                    res.redirect("/products/crud");
                            });
                        });
                }
            });
        }
    },

    borrar: (req, res) => {
        if(req.session.loggedUser && req.session.loggedUser.isadmin)
        {
            db.Product.destroy({
                where: { id: req.params.id },
                cascade: true
            })
                .then((resultado) => {
                    res.redirect("/products/crud");
                })
                .catch(error =>{
                    console.log(error);
                });
        }
    },
    categoria: (req, res) => {
        db.Category.findAll({where: {name: req.params.category}})
            .then((categoria) => {
                let id = categoria[0].dataValues.id;
                db.Product.findAll({where: {category_id: id}})
                    .then(categories => {
                        res.render("products/categories", {categories, categoriaTitulo: categoria[0].dataValues.name})
                    });
            });
    }
}

module.exports = controller;