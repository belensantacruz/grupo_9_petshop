let express =require("express"); 
let router =express.Router();
const path =require ("path");
const controller =require("../controllers/usersController");

// Login
router.get("/login", controller.login);
router.get("/registro", controller.registro);

module.exports=router;