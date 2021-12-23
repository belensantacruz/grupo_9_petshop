let express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");
const multerMiddleware = require("../middlewares/multerProductsMiddleware");
const validateAddProductMiddleware = require("../middlewares/validateAddProductMiddleware");

// Detalle producto
router.get("/detalle/:id", controller.detalle);
router.get("/carrito", controller.carrito);
router.get("/crud", controller.crud);
router.get("/agregarProducto", controller.agregar);
router.post("/agregarProducto", multerMiddleware.single('image'), validateAddProductMiddleware, controller.agregarProducto);
router.get("/editarProducto/:id", controller.editar);
router.put("/editarProducto/:id", multerMiddleware.single('image'), validateAddProductMiddleware, controller.update);
router.delete("/editarProducto/:id", controller.borrar);

module.exports=router;