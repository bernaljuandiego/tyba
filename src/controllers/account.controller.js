const moment = require('moment');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../configuration/config');
const sequelize = require("../models/index").sequelize;



//HELPERS 
const { getInfoLogs, setInfoLogs } = require("../helpers/logs.helpers");
const { generateResponse200, generateResponse400, generateResponse500 } = require("../helpers/generic-response-service.helpers");


//SERVICES
const accountService = require("../services/account.service");
const Logs = require('../services/logs.service');

exports.buscarEmail = async (email) => {

  email = email.toLowerCase();

  const result = await accountService.buscarEmail(email);
  return result;

}

exports.create = async (req, res) => {
  let { ...data } = req.body;

  const t = await sequelize.transaction();

  setInfoLogs({
    requestBody: JSON.stringify(req.body),
    responseBody: '',
    email: req.body.email,
    method: 'POST',
    description: 'este servicio registra un usuario a la plataforma',
    urlService: '/account/register',
    nameService: 'Registro'
  })

  let infoLogs = getInfoLogs();

  const logRegistred = await Logs.create(infoLogs);

  try {
    const cuenta = await this.buscarEmail(data.email);
    if (!cuenta) {
      let result = await accountService.create(data, t);
      uuid = result.dataValues.uuid
    } else {
      return res.status(400).json({
        CODE: 400,
        STATUS: 'Bad request',
        MESSAGE: 'Email Existente',
        errors: [
          {
            msg: 'Email Ya se encuentra Registrado',
            param: 'email',
            location: 'body'
          }
        ]
      })
    }

    const body = { _id: uuid, email: data.email }

    const token = await jwt.sign({ user: body }, config.SECRET, { expiresIn: config.JWTEXPIRATION });


    let infoResponse = {
      message: "Registro creado exitosamente.",
      application: { token }, canCommit: true
    };

    return await generateResponse200(infoResponse, res, t, { infoLogs, idLog: logRegistred.dataValues.id });

  } catch (error) {

    let infoResponse = { message: "Registro no creado exitosamente.", canRollback: true };

    return await generateResponse500(infoResponse, res, t, { infoLogs, idLog: logRegistred.dataValues.id });

  }
}

exports.getToken = async (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {

    setInfoLogs({
      requestBody: JSON.stringify(req.body),
      responseBody: '',
      email: req.body.email,
      method: req.method,
      description: 'este servicio autentica al usuario a la plataforma',
      urlService: req.url,
      nameService: 'Autenticación'
    })

    let infoLogs = getInfoLogs();

    const logRegistred = await Logs.create(infoLogs);

    try {

      if (err || !user ) {
        let infoResponse = { message: "Usuario no logueado.", error: info };
        return await generateResponse400(infoResponse, res, null, { infoLogs, idLog: logRegistred.dataValues.id });
      }


      req.login(user, { session: false }, async (err) => {

        if (err) {

          let infoResponse = { message: "Error al loguearse." };

          return await generateResponse500(infoResponse, res, null, { infoLogs, idLog: logRegistred.dataValues.id });
        }

        const body = { _id: user.uuid, email: user.email }
        jwt.sign({ user: body }, config.SECRET, { expiresIn: config.JWTEXPIRATION }, async (e, token) => {

          const payload = jwt.verify(token, config.SECRET);
          let issued = moment(payload.iat * 1000).format('llll');
          let expires = moment(payload.exp * 1000).format('llll');

          let infoResponse = {
            message: "Bienvenid@ "+body.email, 
            application: {
              token,
              statusAccount: user.status,
              expires_in: 600,
              issued,
              expires
            }
          };
          return await generateResponse200(infoResponse, res, null, { infoLogs, idLog: logRegistred.dataValues.id });
        });


      })
    }
    catch (e) {
      return next(e)
    }
  })(req, res, next)
}

exports.logout = async (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
}

