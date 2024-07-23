const passport = require("passport")
const {validationResult} = require('express-validator');
const genericError  = require('../helpers/generic-errors.helper')
const genericMessage = require('../helpers/generic-messages.helper')
const genericResponse = require('../helpers/generic-response.helper')
const {getInfoLogs,setInfoLogs} = require("../helpers/logs.helpers");
const { generateResponseFields400 } = require('../helpers/generic-response-service.helpers');


exports.auth = (req, res, next) => {
    console.log("AUTHENTICATED?");
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if(err || !user) {

            setInfoLogs({
                requestBody : JSON.stringify(user),
                responseBody : '',
                email : req.header('auth'),
                description : 'error de autorización',
                urlService:req.url,
                method:req.method,
                nameService : req.url
                
    
            })
            console.log("holaaaa");
            let infoLogs = getInfoLogs();
    
            return await generateResponseFields400("error en alguno de los campos","token no valido",res,infoLogs);
           
        }
        return next();
    })(req, res, next)
}



exports.validarCampos = async (req,res,next) => {
    console.log(req.url);
    const error = validationResult(req);
   
    if(!error.isEmpty()){
        setInfoLogs({
            requestBody : JSON.stringify(req.body),
            responseBody : '',
            email : req.body.email,
            description : 'Error de campo',
            urlService:req.url,
            method:req.method,
            nameService : req.url
            

        })
    
        let infoLogs = getInfoLogs();
        return await generateResponseFields400("error en alguno de los campos",error.errors,res,infoLogs);     

    }

    next();

}

exports.validarJWT = async(req,res,next)=>{

    try {

        let result = await passport.authenticate;
        console.log(result);

    }catch(error) {

        const response = genericResponse.error(
                         genericMessage.error403.CODE,
                         genericMessage.error403.STATUS,
                         "Error de verificación",
                         error)

        return res.status(response.CODE).json(response);
        

    }
   
    next();
}



