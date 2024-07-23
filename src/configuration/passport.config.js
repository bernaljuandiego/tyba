const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Account = require('../models').account;
const config = require('./config');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, cb) => {
    return Account.findOne({ where: { email: email } })
        .then(user => {
            if (user === null) {
                return cb(null, false, { msg: 'Correo electrónico o Contraseña Incorrecta.' });
            } else if (bcrypt.compareSync(password, user.password)) {
                return cb(null, user);
            } else {
                return cb(null, false, { msg: 'Correo electrónico o Contraseña Incorrecta.' });
            }
        })
        .catch(err => {
            console.log("ERROR ::: en PASSPORT")
            console.log(err);
            cb(err)
        });
}
));

// Serialización y deserialización de usuario
passport.serializeUser((user, cb) => {
    console.log("SERIALIZE USER");
    cb(null, user)
});

passport.deserializeUser((user, cd) => {
    console.log("DESERIALIZE USER");
    Account.findOne({ where: { email: user.email } })
        .then(result => {
            cb(null, user);
        })
        .catch(err => {
            console.log(err)
            cb(null, err);
        })
})

let opts = {}
opts.jwtFromRequest = ExtractJWT.fromHeader('auth');
opts.secretOrKey = config.SECRET;

passport.use(new JWTStrategy(opts, (jwtPayload, cb) => {
    console.log('JWT STRATEGY');
    console.log(jwtPayload);
    return Account.findOne({ where: { email: jwtPayload.user.email }})
        .then(user => {
            if (user) {
                console.log(user)
                if (((new Date().getTime() + 1) / 1000) < jwtPayload.exp) {
                    console.log((new Date().getTime() + 1) / 1000);
                    return cb(null, user);
                } else {
                    return cb(null, false, { message: 'Token expirado.' })
                }
            } else {
                return cb(null, false, { message: 'El usuario no existe.' })
            }
        })
        .catch(err => {
            console.log(err);
            return cb(err);
        });
}
));






