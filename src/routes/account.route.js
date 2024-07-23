const { body, param, query } = require("express-validator");

const accountController = require("../controllers/account.controller");
const middleware = require('../helpers/middleware.help');
const { passwordValido } = require('../helpers/validator-db.js');

module.exports = function (app, base_api) {
    app.post(base_api + "/account/register", [
        body('email', ' Ingresa tu correo personal.').not().isEmpty(),
        body('email', 'Debe ser un email válido.').isEmail(),
        body('password', 'Crea una contraseña.').not().isEmpty(),
        body('password').custom(passwordValido),
        middleware.validarCampos
    ], accountController.create); //CREATE ACCOUNT
}

