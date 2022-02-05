let express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const controller = require("../controllers/apiController");

router.get("/users", controller.getUsers);
router.get("/users/:id", controller.getOneUser);
router.get('/products', controller.getProducts);
router.get('/products/:id', controller.getOneProduct);
router.get('/metrics', controller.metrics);
router.get('/categories', controller.category);
router.get('/allproducts', controller.allProducts);

module.exports = router;