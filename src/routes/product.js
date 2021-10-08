let express =require("express");
const router =express.Router();
const controller =require("../controllers/productController");



// Detalle producto
router.get("/detalle", controller.detalle);
router.get("/carrito", controller.carrito);

module.exports=router;