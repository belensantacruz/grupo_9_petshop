const path =require ("path");
const fs = require('fs');
//let jsonUsers = fs.readFileSync(path.resolve(__dirname, '../database/users.json'), 'utf-8'); //Leer jsons y parsearlos
//let users = JSON.parse(jsonUsers); //json a array
const bcrpyt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require("../database/models");

let controller ={
    login : (req, res) =>{
        res.render("users/login");
    },

    processLogin: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            res.render ('users/login', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }
        else{
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            }).then((resultado) =>{
                let userToLogin = resultado;
                if (userToLogin) {
                    let passwordOK = bcrpyt.compareSync(req.body.password, userToLogin.dataValues.password);
                    if (passwordOK) {
                        delete userToLogin.dataValues.password;
                        req.session.loggedUser = userToLogin.dataValues;
                        res.locals.isLogged = true;
                        res.locals.loggedUser = req.session.loggedUser;
                        if(req.body.remember)
                            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 });
                        res.redirect('/users/profile');
                    }
                    else{
                        res.render('users/login', {
                            errors: {
                                email: {
                                    msg: 'Las credenciales son invalidas'
                                }
                            },
                            oldData: req.body
                        });
                    }
                }
                else{
                    res.render('users/login', {
                        errors: {
                            email: {
                                msg: 'Este email no se encuentra registrado'
                            }
                        }
                    });
                }
            });
        }
    },

    register: (req, res) => {
        res.cookie()
        res.render('users/registro')
    },

    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            res.render ('users/registro', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }
        else{
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            }).then((resultado) => {
                let userInDB = resultado
                if (userInDB) {
                    res.render ('users/registro', {
                        errors: {
                            email: {
                                msg: 'Este email ya esta registrado'
                            }
                        },
                        oldData: req.body
                    });
                }
                else{
                    let userToCreate = {
                        ...req.body,
                        password: bcrpyt.hashSync(req.body.password, 12),
                        avatar: req.file.filename,
                        isadmin: 0
                    }
        
                    let userCreated = db.User.create(userToCreate);
                    res.redirect('/users/login')
                }
            });
        }
    },

    profile: (req, res) => {
        res.render('users/profile', {
            user: req.session.loggedUser
        });
    }
}


module.exports = controller;