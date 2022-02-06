const path =require ("path");
const fs = require('fs');
const db = require("../database/models");
const { parse } = require("path");
const e = require("express");
const res = require("express/lib/response");

let controller = {
    getUsers: (req, res) => {
        if(!req.query.page)
            req.query.page = 1;
        let totalInDb;
        let pagination;
        db.User.findAll()
            .then(resultado => {
                totalInDb = resultado.length;
            });
        db.User.findAll({
            limit: 5,
            offset: 5 * (req.query.page - 1)
        })
            .then(resultado => {
            let paramObj = {
                count: totalInDb,
                users: resultado.map(function(item) {
                    return {
                        id: item.id,
                        name: item.name,
                        email: item.email,
                        detail: "http://localhost:8080/users/profile"
                    }
                }),
                status: 200
            };
            if((5 * req.query.page) < totalInDb){
                pagination = { next: "http://localhost:8080/api/users?page=" + (Number(req.query.page) + 1) };
                paramObj = { ...paramObj, ...pagination };
            }
            if(req.query.page > 1)
            {
                pagination = { previous: "http://localhost:8080/api/users?page=" + (Number(req.query.page) - 1) };
                paramObj = { ...paramObj, ...pagination };
            }
            return res.status(200).json(paramObj);
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
                avatar: "http://localhost:8080/images/users/" + resultado.avatar
            })
        });
    },

    getProducts: (req, res) => {
        if(!req.query.page)
            req.query.page = 1;
        let totalInDb;
        let pagination;
        let categories = db.Category.findAll({ attributes: {exclude: ['products']} });
        let totalProducts = db.Product.findAll();
        let products = db.Product.findAll({
            limit: 5,
            offset: 5 * (req.query.page - 1)
        });
        Promise.all([categories, products, totalProducts])
        .then(([categories, products, totalProducts]) => {
            totalInDb = totalProducts.length
            
            // Inicio logica countByCategory
            let contadorSnacks = []
            let contadorAccesorios = []     
            let contadorAlimentos = []
            let contadorJuguetes = []
            let contadorHigiene = []
            totalProducts.forEach(element => {
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
            //Fin logica countByCategory
            
            let paramObj = {
                count: totalProducts.length,
                countByCategory: {
                    snacks: contadorSnacks.length,
                    accesorios: contadorAccesorios.length,
                    alimentos: contadorAlimentos.length,
                    juguetes: contadorJuguetes.length,
                    higiene: contadorHigiene.length
                },
                products: products.map(function(product) {
                    return { 
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        detail: "http://localhost:8080/products/detalle/" + product.id,
                        category: categories[product.category_id - 1]
                    }
                })
            };
            if((5 * req.query.page) < totalInDb){
                pagination = { next: "http://localhost:8080/api/products?page=" + (Number(req.query.page) + 1) };
                paramObj = { ...paramObj, ...pagination };
            }
            if(req.query.page > 1)
            {
                pagination = { previous: "http://localhost:8080/api/products?page=" + (Number(req.query.page) - 1) };
                paramObj = { ...paramObj, ...pagination };
            }
            return res.json(paramObj);
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
                image: "http://localhost:8080/images/products/" + product.image,
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