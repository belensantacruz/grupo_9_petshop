const path =require ("path");
const fs = require('fs');
let jsonUsers = fs.readFileSync(path.resolve(__dirname, '../data/users.json'), 'utf-8'); //Leer jsons y parsearlos
let users = JSON.parse(jsonUsers); //json a array
const bcrpyt = require('bcryptjs');

//Generar nuevo id:
const nuevoId =()=>{
    let ultimo=0;
    users.forEach(element =>{
        if (element.id > ultimo){
            ultimo=element.id;
        }
    })
        return ultimo +1;
}

let controller ={
    login : (req, res) =>{
        res.render("users/login");
    },
    registro : (req, res) =>{
        let usuario={
            ...req.body,
        };
        res.render("users/registro", {usuario});
    },
    register: (req,res) =>{
        let usuario = {
            id: nuevoId(),
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrpyt.hashSync(req.body.password, 10),
            //contraseña confirmacion??
            avatar: req.file.originalname,
            isAdmin: req.body.email.includes('@admin.com')
           };
            users.push(usuario);
        jsonUsers= JSON.stringify(users, null, 4);
        fs.writeFileSync(path.resolve(__dirname, "../data/users.json"), jsonUsers);
        res.redirect('/');
    }
};

module.exports = controller;