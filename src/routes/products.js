let express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");
const multerMiddleware = require("../middlewares/multerProductsMiddleware");
const validateAddProductMiddleware = require("../middlewares/validateAddProductMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// Detalle producto
router.get("/detalle/:id", controller.detalle);
router.get("/carrito", controller.carrito);
router.get("/crud", adminMiddleware, controller.crud);
router.get("/agregarProducto", adminMiddleware, controller.agregar);
router.post("/agregarProducto", adminMiddleware, multerMiddleware.single('image'), validateAddProductMiddleware, controller.agregarProducto);
router.get("/editarProducto/:id", adminMiddleware, controller.editar);
router.put("/editarProducto/:id", adminMiddleware, multerMiddleware.single('image'), validateAddProductMiddleware, controller.update);
router.delete("/editarProducto/:id", adminMiddleware, controller.borrar);

module.exports=router;