let express =require("express");
const router =express.Router();
const controller =require("../controllers/productController");

// Detalle producto
router.get("/detalle/:id", controller.detalle);
router.get("/carrito", controller.carrito);
router.get("/crud", controller.crud);
router.get("/agregarProducto", controller.agregar);
router.post("/agregarProducto", controller.agregarProducto);
router.get("/editarProducto/:id", controller.editar);
router.put("/editarProducto/:id", controller.update);
router.delete("/editarProducto/:id", controller.borrar);

module.exports=router;