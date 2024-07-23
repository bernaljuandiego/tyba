const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const Account = require('../models').account;
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, cb) => {
    return Account.findOne({ where: { email: email }, include: [{ association: 'personal_informations' }] })
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




