const path = require('path');
const { body } = require('express-validator');

module.exports = [
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