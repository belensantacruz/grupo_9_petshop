let express =require("express");
const router =express.Router();
const controller =require("../controllers/productController");
const path = require('path');
const fs = require('fs');
const numOfProdImages = (req) => {
    if(req == undefined)
        return fs.readdirSync('./public/images/products/').length;
    else
        return req.params.id
}
const multer = require('multer');
//multer:
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images/products');
    },
    filename: function(req, file, cb){
        cb(null, `producto${numOfProdImages(req)}${path.extname(file.originalname)}`);
    }
});
const uploadFile = multer({storage});

// Detalle producto
router.get("/detalle/:id", controller.detalle);
router.get("/carrito", controller.carrito);
router.get("/crud", controller.crud);
router.get("/agregarProducto", controller.agregar);
router.post("/agregarProducto", uploadFile.single('image'), controller.agregarProducto);
router.get("/editarProducto/:id", controller.editar);
router.put("/editarProducto/:id", uploadFile.single('image'), controller.update);
router.delete("/editarProducto/:id", controller.borrar);

module.exports=router;