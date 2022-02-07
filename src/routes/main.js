let express =require("express"); 
const router =express.Router();
const controller =require("../controllers/mainController");

router.get("/", controller.home);
router.get("/logout", controller.logout);
    

module.exports= router;