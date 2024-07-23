const passport = require('passport');
const sequelize = require("../models/index").sequelize;
//HELPERS 
const { getInfoLogs, setInfoLogs } = require("../helpers/logs.helpers");
const { generateResponse200, generateResponse500 } = require("../helpers/generic-response-service.helpers");
//SERVICES
const Logs = require('../services/logs.service');
exports.getLogs = async (req, res, next) => {
    passport.authenticate('local', { session: true }, async (err, user, info) => {

        const t = await sequelize.transaction();
        setInfoLogs({
            requestBody: JSON.stringify(req.body),
            responseBody: '',
            email: 'logs',
            method: req.method,
            description: 'este servicio consulta los logs',
            urlService: req.url,
            nameService: 'view logs'
        })
        let infoLogs = getInfoLogs();

        const logRegistred = await Logs.create(infoLogs);

        try {
            const logs = await Logs.getAll();
            let infoResponse = {
                message: "Logs obtenidos exitosamente.",
                application: logs, canCommit: true
            };
            return await generateResponse200(infoResponse, res, t, { infoLogs, idLog: logRegistred.dataValues.id });
        } catch (error) {
            let infoResponse = { message: "No se obtuvieron los logs.", canRollback: true };

            return await generateResponse500(infoResponse, res, t, { infoLogs, idLog: logRegistred.dataValues.id });
        }
    })(req, res, next)
}