const express = require("express");
const app = express();
const config = require('./configuration/config');
const passport = require('passport');
const bodyParser  = require('body-parser');

require('./configuration/passport.config');

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const BASE_API = config.API_PATH + config.API_VERSION

// llamado a rutas
require('./routes/account.route.js')(app, BASE_API);


// mensaje de bienvenida
app.listen(config.PORT, function(){
    console.log(`Prueba tecnica Tyba en puerto ${config.PORT}`)
})