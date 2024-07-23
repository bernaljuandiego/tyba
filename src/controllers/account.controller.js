const moment = require('moment');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../configuration/config');
const sequelize = require("../models/index").sequelize;



//HELPERS 
const { getInfoLogs, getInfoLogsInternal, setInfoLogs, setInfoLogsInternal } = require("../helpers/logs.helpers");
const { generateResponse200, generateResponse400, generateResponse500 } = require("../helpers/generic-response-service.helpers");

const genericMessage = require('../helpers/generic-messages.helper')
const genericResponse = require('../helpers/generic-response.helper');

//SERVICES
const accountService = require("../services/account.service");
const Account = require('../models').account;
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

