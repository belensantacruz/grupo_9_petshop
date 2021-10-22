let express =require("express");
const router =express.Router();
const controller =require("../controllers/productController");



// Detalle producto
router.get("/detalle/:id", controller.detalle);
router.get("/carrito", controller.carrito);
router.get("/crud", controller.crud);
router.get("/agregarItem", controller.crudForm);
router.get("/editarProducto", controller.editar);

module.exports=router;