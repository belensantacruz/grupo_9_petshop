let express =require("express"); 
let router =express.Router();
const path =require ("path");
const controller =require("../controllers/usersController");
const multer = require('multer');
const { body } = require('express-validator')

const validationsRegister = [
    body('name').notEmpty().withMessage('Tenes que escribir un nombre'),
    body('lastname').notEmpty().withMessage('Tenes que escribir un apellido'),
    body('email')
        .notEmpty().withMessage('Tenes que escribir un email').bail()
        .isEmail().withMessage('Tenes que escribir un email valido'),
    body('password').notEmpty().withMessage('Tenes que escribir una contraseña'),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        if (!file) {
            throw new Error ('Tenes que subir una imagen');
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
        .notEmpty().withMessage('Tenes que escribir un email').bail()
        .isEmail().withMessage('Tenes que escribir un email valido')
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
router.get("/login", controller.login);
router.post("/login", validationsLogin, controller.processLogin);

//Register
router.get("/registro", controller.register);
router.post("/registro",uploadFile.single('image'), validationsRegister, controller.processRegister);

module.exports=router;