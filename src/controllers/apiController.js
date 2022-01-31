const path =require ("path");
const fs = require('fs');
const db = require("../database/models");
const { parse } = require("path");

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
    }
}

module.exports = controller;