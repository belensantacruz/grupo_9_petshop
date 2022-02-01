const path =require ("path");
const fs = require('fs');
const db = require("../database/models");
const { parse } = require("path");
const e = require("express");

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
        db.Product.findAll()
        .then(resultado => {

                    // Inicio logica countByCategory

                    let contadorSnacks = []
                    let contadorAccesorios = []     
                    let contadorAlimentos = []
                    let contadorJuguetes = []
                    let contadorHigiene = []
                
                    
                    resultado.forEach(element => {

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

                    // Fin logica countByCategory
            
            return res.status(200).json({
                count: resultado.length,
                countByCategory: {
                    snacks: contadorSnacks.length,
                    accesorios: contadorAccesorios.length,
                    alimentos: contadorAlimentos.length,
                    juguetes: contadorJuguetes.length,
                    higiene: contadorHigiene.length
                },
                products: resultado.map(function(item) {
                    return {
                        id: item.id,
                        name: item.name,
                        category_id: item.category_id,
                        detail: "http://localhost:3000/products/detalle/" + item.id
                    }
                }),
                status: 200
            });
        });
    },

    getOneProduct: (req, res) => {
        db.Product.findByPk(req.params.id)
        .then(resultado => {
            return res.status(200).json({
                id: resultado.id,
                category_id: resultado.category_id,
                name: resultado.name,
                descripcion: resultado.description,
                price: resultado.price,
                image: "http://localhost:3000/images/products/" + resultado.image,
                rating: resultado.rating,
                status: resultado.status,
                stock: resultado.stock
            })
        });
    }
}

module.exports = controller;