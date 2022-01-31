let express = require("express");
const router = express.Router();
const controller = require("../controllers/apiController");

router.get("/users", controller.getUsers);
router.get("/users/:id", controller.getOneUser);

module.exports = router;