const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('email')
        .notEmpty().withMessage('Debe escribir un email').bail()
        .isEmail().withMessage('Debe escribir un email válido')
];