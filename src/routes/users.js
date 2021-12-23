let express =require("express"); 
let router =express.Router();
const controller =require("../controllers/usersController");
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const validateRegisterMiddleware = require("../middlewares/validateRegisterMiddleware");
const validateLoginMiddleware = require("../middlewares/validateLoginMiddleware");
const multerMiddleware = require("../middlewares/multerUsersMiddleware");

// Login
router.get("/login", guestMiddleware, controller.login);
router.post("/login", validateLoginMiddleware, controller.processLogin);

//Profile
router.get("/profile", authMiddleware, controller.profile);

//Register
router.get("/registro", guestMiddleware, controller.register);
router.post("/registro", multerMiddleware.single('image'), validateRegisterMiddleware, controller.processRegister);

module.exports=router;