const { body } = require("express-validator");

const restaurantsController = require("../controllers/restaurants.controller.js");
const middleware = require('../helpers/middleware.help');


module.exports = function (app, base_api) {

        // servicio de autenticacion
    app.post(base_api + "/restaurants", [
        body('lat', ' Ingresa el valor de latitud.').not().isEmpty(),
        body('lat', 'Debe ser un valor numerico.').isNumeric(), 
        body('lon', ' Ingresa el valor de longitud.').not().isEmpty(),
        body('lon', 'Debe ser un valor numerico.').isNumeric(),
        body('range', ' Ingresa el valor del rango en metros.').not().isEmpty(),
        body('range', 'Debe ser un valor numerico medido en metros.').isNumeric(),
        middleware.validarCampos],
        middleware.auth,
        restaurantsController.getRestaurants);
}