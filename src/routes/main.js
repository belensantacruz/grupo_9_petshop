let express =require("express"); 
const router =express.Router();
const controller =require("../controllers/mainController");

router.get("/", controller.home);
router.get("/logout", controller.logout);
router.get("/nosotros", controller.nosotros);
    

module.exports= router;