const { body } = require("express-validator");

const accountController = require("../controllers/account.controller");
const middleware = require('../helpers/middleware.help');
const { passwordValido } = require('../helpers/validator-db.js');


module.exports = function (app, base_api) {

    // Ruta raíz
    app.get('/', (req, res) => {
        res.send('Bienvenido a la API Tyba');
    });

    // servicio de registro de usuarios
    app.post(base_api + "/account/register", [
        body('email', ' Ingresa tu correo personal.').not().isEmpty(),
        body('email', 'Debe ser un email válido.').isEmail(),
        body('password', 'Crea una contraseña.').not().isEmpty(),
        body('password').custom(passwordValido)],
        middleware.validarCampos,
        accountController.create);


    // servicio de autenticacion
    app.post(base_api + "/account/authenticate", [
        body('email', ' Ingresa tu correo personal.').not().isEmpty(),
        body('email', 'Debe ser un email válido.').isEmail(),
        body('password', 'Ingresa una contraseña.').not().isEmpty()],
        middleware.validarCampos,
        accountController.getToken);

    app.get(base_api + "/account/logout",
        middleware.auth,
        accountController.logout);

}




