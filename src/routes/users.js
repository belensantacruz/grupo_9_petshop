let express =require("express"); 
let router =express.Router();
const path =require ("path");
const controller =require("../controllers/usersController");
const multer = require('multer');
const { body } = require('express-validator');
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const validationsRegister = [
    body('name').notEmpty().withMessage('Debe escribir un nombre'),
    body('lastname').notEmpty().withMessage('Debe escribir un apellido'),
    body('email')
        .notEmpty().withMessage('Debe escribir un email').bail()
        .isEmail().withMessage('Debe escribir un email válido'),
    body('password').notEmpty().withMessage('Debe escribir una contraseña'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        if (!file) {
            throw new Error ('Debe subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            } 
        }
        return true;
    })
];

const validationsLogin = [
    body('email')
        .notEmpty().withMessage('Debe escribir un email').bail()
        .isEmail().withMessage('Debe escribir un email válido')
]

//multer:
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images/users');
    },
    filename: function(req, file, cb){
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});
const uploadFile = multer({storage});

// Login
router.get("/login", guestMiddleware, controller.login);
router.post("/login", validationsLogin, controller.processLogin);
router.get("/profile", authMiddleware, controller.profile);

//Register
router.get("/registro", controller.register);
router.post("/registro",uploadFile.single('image'), validationsRegister, controller.processRegister);

module.exports=router;