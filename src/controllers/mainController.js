const path =require ("path");

let controller ={
    home : (req, res) =>{
        res.render("index");
    }
}

module.exports =controller;