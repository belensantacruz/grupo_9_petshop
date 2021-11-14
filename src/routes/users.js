let express =require("express"); 
let router =express.Router();
const path =require ("path");
const controller =require("../controllers/usersController");
const multer = require('multer');

//multer:
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images/users');
    },
    filename: function(req, file, cb){
        cb(null, `${file.originalname}`);
    }
});
const uploadFile = multer({storage});

// Login
router.get("/login", controller.login);
router.post("/registro", uploadFile.single('image'), controller.register);
router.get("/registro", controller.registro);

module.exports=router;