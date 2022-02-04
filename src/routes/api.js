let express = require("express");
const router = express.Router();
const controller = require("../controllers/apiController");

router.get("/users/page=:page", controller.getUsers);
router.get("/users", controller.getUsers);
router.get("/users/:id", controller.getOneUser);
router.get('/products', controller.getProducts);
router.get('/products/page=:page', controller.getProducts);
router.get('/products/:id', controller.getOneProduct);

module.exports = router;