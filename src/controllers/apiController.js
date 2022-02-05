const path =require ("path");
const fs = require('fs');
const db = require("../database/models");
const { parse } = require("path");
const e = require("express");
const res = require("express/lib/response");

let controller = {
    getUsers: (req, res) => {
        db.User.findAll()
        .then(resultado => {
            return res.status(200).json({
                count: resultado.length,
                users: resultado.map(function(item) {
                    return {
                        id: item.id,
                        name: item.name,
                        email: item.email,
                        detail: "http://localhost:3000/users/profile"
                    }
                }),
                status: 200
            });
        });
    },

    getOneUser: (req, res) => {
        db.User.findByPk(req.params.id)
        .then(resultado => {
            return res.status(200).json({
                id: resultado.id,
                name: resultado.name,
                lastname: resultado.lastname,
                email: resultado.email,
                avatar: "http://localhost:3000/images/users/" + resultado.avatar
            })
        });
    },

    getProducts: (req, res) => {

            let categories = db.Category.findAll({
                attributes: {exclude: ['products']}
            });

            let products = db.Product.findAll({
                include: {all: true}
            });

            Promise.all([categories, products])

            .then(([categories, products]) => {

                                        // // Inicio logica countByCategory

                                        let contadorSnacks = []
                                        let contadorAccesorios = []     
                                        let contadorAlimentos = []
                                        let contadorJuguetes = []
                                        let contadorHigiene = []
                                    
                                        
                                        products.forEach(element => {

                                            if(element.category_id == 1){
                                                contadorSnacks.push(element);
                                            } else if(element.category_id == 2){
                                                contadorAccesorios.push(element);
                                            } else if(element.category_id == 3){
                                                contadorAlimentos.push(element);
                                            } else if(element.category_id == 4){
                                                contadorJuguetes.push(element);
                                            } else {(element.category_id == 5)
                                                contadorHigiene.push(element);
                                            }
                                        });

                                        // // Fin logica countByCategory


                listaProductos = []

                products.forEach(product => {
                    listaProductos.push({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        detail: "http://localhost:3000/products/detalle/" + product.id,
                        category: categories[product.category_id - 1]
                    })
                })

                return res.json({
                    count: products.length,
                    countByCategory: {
                        snacks: contadorSnacks.length,
                        accesorios: contadorAccesorios.length,
                        alimentos: contadorAlimentos.length,
                        juguetes: contadorJuguetes.length,
                        higiene: contadorHigiene.length
                    },
                    products: listaProductos
                })
            })

        },

    getOneProduct: (req, res) => {

        let categories = db.Category.findAll({
            attributes: {exclude: ['products']}
        });

        let product = db.Product.findByPk(req.params.id, {
            attributes: {exclude: ['categories']}
        });

        Promise.all([categories, product])

        .then(([categories, product]) => {

            return res.json({
                id: product.id,
                name: product.name,
                descripcion: product.description,
                price: product.price,
                image: "http://localhost:3000/images/products/" + product.image,
                rating: product.rating,
                status: product.status,
                stock: product.stock,
                category: categories[product.category_id - 1]
            })
        })
    },

    metrics: (req, res) => {
        let categories = db.Category.findAll()

        let products = db.Product.findAll()

        let users = db.User.findAll()

        Promise.all([categories, products, users])

        .then(([categories, products, users]) => {
            return res.json({
                results: [
                {
                    name: 'Usuarios en la DB',
                    cantidad: users.length,
                    color: 'warning'
                },
                {
                    name: 'Productos en la DB',
                    cantidad: products.length,
                    color: 'primary'
                },
                {
                    name: 'Categorias en la DB',
                    cantidad: categories.length,
                    color: 'success'
                }
                ]   
            })
        })
    },

    category: (req, res) => {
        db.Category.findAll({
            include: {all: true}
        })
        .then(resultado => {
            res.json(resultado);
        })
    },

    allProducts: (req, res) => {
        db.Product.findAll({
            include: {all: true}
        })
        .then(resultado => {
            res.json(resultado);
        })
    }

}

module.exports = controller;