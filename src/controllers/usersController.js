const path =require ("path");
const fs = require('fs');
let jsonUsers = fs.readFileSync(path.resolve(__dirname, '../data/users.json'), 'utf-8'); //Leer jsons y parsearlos
let users = JSON.parse(jsonUsers); //json a array
const bcrpyt = require('bcryptjs');
const User = require('../models/Users');
const { validationResult } = require('express-validator')

let controller ={
    login : (req, res) =>{
        res.render("users/login");
    },

    processLogin: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render ('users/login', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }

        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin) {
            let passwordOK = bcrpyt.compareSync(req.body.password, userToLogin.password)
            if (passwordOK) {
                res.send('ok puedes ingresar')
            }

            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son invalidas'
                    }
                }
            })
        }

        return res.render('users/login', {
            errors: {
                email: {
                    msg: 'Este email no se encuentra registrado'
                }
            }
        })
    },

    register: (req, res) => {
        return res.render('users/registro')
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render ('users/registro', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }

        let userInDB = User.findByField('email', req.body.email);

        if (userInDB) {
            return res.render ('users/registro', {
                errors: {
                    email: {
                        msg: 'Este email ya esta registrado'
                    }
                },
                oldData: req.body,
            });
        }

        let userToCreate = {
            ...req.body,
            password: bcrpyt.hashSync(req.body.password, 12),
            avatar: req.file.filename,
        }

        let userCreated = User.create(userToCreate);
        res.redirect('/users/login')
    }
};

module.exports = controller;