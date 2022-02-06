const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('email')
        .notEmpty().withMessage('Debe escribir un email').bail()
        .isEmail().withMessage('Debe escribir un email válido'),
    body('password')
        .notEmpty().withMessage('Debe escribir una contraseña')
        .isLength({min: 8, max: 20}).withMessage('La contraseña debe ser entre 8 y 20 caracteres')
];