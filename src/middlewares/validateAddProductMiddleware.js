const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('name')
        .notEmpty().withMessage('Debe escribir un nombre para el producto'),
    body('description')
        .notEmpty().withMessage('Debe escribir una descripción para el producto'),
    body('category')
        .notEmpty().withMessage('Debe escribir una categoría para el producto').bail()
        .isInt().withMessage('Debe escribir el id de la categoría'),
    body('price')
        .notEmpty().withMessage('Debe escribir un precio para el producto').bail()
        .isFloat().withMessage('Debe escribir un numero con el siguiente formato: NNNN.NN'),
    body('rating')
        .notEmpty().withMessage('Debe escribir un rating para el producto').bail()
        .isInt().withMessage('Debe escribir un número del 1 al 5'),
    body('status')
        .notEmpty().withMessage('Debe escribir un status para el producto'),
    body('stock')
        .notEmpty().withMessage('Debe escribir un stock para el producto').bail()
        .isInt().withMessage('Debe escribir un número'),
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