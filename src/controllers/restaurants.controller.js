
const passport = require('passport');
const axios = require('axios');
const config = require('../configuration/config');
const sequelize = require("../models/index").sequelize;
//HELPERS 
const { getInfoLogs, setInfoLogs } = require("../helpers/logs.helpers");
const { generateResponse200, generateResponse400, generateResponse500 } = require("../helpers/generic-response-service.helpers");
//SERVICES
const Logs = require('../services/logs.service');
exports.getRestaurants = async (req, res, next) => {
    passport.authenticate('local', { session: true }, async (err, user, info) => {

        const t = await sequelize.transaction();
        setInfoLogs({
            requestBody: JSON.stringify(req.body),
            responseBody: '',
            email: 'restaurant',
            method: req.method,
            description: 'este servicio consulta los restaurantes',
            urlService: req.url,
            nameService: 'Get Restaurants'
        })
        let infoLogs = getInfoLogs();

        const logRegistred = await Logs.create(infoLogs);

        const apiKey = config.GOOGLE_PLACES_API_KEY;
        const tipo = 'restaurant';
        const latitud = req.body.lat;
        const longitud = req.body.lon;
        const rango = req.body.range;

        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitud},${longitud}&radius=${rango}&type=${tipo}&key=${apiKey}`;

        try {
            const respuesta = await axios.get(url);
            const restaurantes = respuesta.data.results;
            const lista = restaurantes.map(restaurante => ({
                nombre: restaurante.name,
                direccion: restaurante.vicinity,
                rating: restaurante.rating,
            }));
            let infoResponse = {
                message: "Restaurantes obtenidos exitosamente.",
                application: lista, canCommit: true
            };
            return await generateResponse200(infoResponse, res, t, { infoLogs, idLog: logRegistred.dataValues.id });
        } catch (error) {
            let infoResponse = { message: "No se obtuvieron los restaurantes.", canRollback: true };

            return await generateResponse500(infoResponse, res, t, { infoLogs, idLog: logRegistred.dataValues.id });
        }
    })(req, res, next)
}