const express = require("express");
const app = express();
const config = require('./configuration/config');
const passport = require('passport');
const session = require('express-session');
const bodyParser  = require('body-parser');

require('./configuration/passport.config');

// Configuración de la sesión
app.use(session({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: false
  }));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const BASE_API = config.API_PATH + config.API_VERSION

// llamado a rutas
require('./routes/account.route.js')(app, BASE_API);
require('./routes/restaurants.route.js')(app, BASE_API);


// mensaje de bienvenida
app.listen(config.PORT, function(){
    console.log(`Prueba tecnica Tyba en puerto ${config.PORT}`)
})