const path =require ("path");

let controller ={
    login : (req, res) =>{
        res.render("login");
    },
    registro : (req, res) =>{
        res.render("registro");
    }
};

module.exports =controller;