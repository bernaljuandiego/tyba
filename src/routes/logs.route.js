
const logsController = require("../controllers/logs.controller.js");
const middleware = require('../helpers/middleware.help');


module.exports = function (app, base_api) {

    // servicio de autenticacion
    app.get(base_api + "/logs",
        middleware.auth,
        logsController.getLogs);
}