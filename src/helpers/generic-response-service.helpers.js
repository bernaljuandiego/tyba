const genericMessage = require('../helpers/generic-messages.helper');
const genericResponse = require('../helpers/generic-response.helper');

//services
const LogsServices = require("../services/logs.service");

const generateResponse200 = async ({message,application,canCommit=false},res,t,logs)=>{

    

    let response = genericResponse.success(
                   genericMessage.success.CODE,
                   genericMessage.success.STATUS,
                   message,
                   application);

    logs.infoLogs.responseBody = JSON.stringify(response).slice(0,2500);

    await LogsServices.update(logs.infoLogs,logs.idLog);

    if(canCommit){

        await t.commit();
    }
                                               
    return res.status(response.CODE).json(response);
}

const generateResponse201 = async ({message,data,canCommit=true},res,t,logs )=>{

    let response = genericResponse.success(
                   genericMessage.created.CODE,
                   genericMessage.created.STATUS,
                   message,
                   data); 
                   
    logs.infoLogs.responseBody = JSON.stringify(response).slice(0,2500);

    await LogsServices.update(logs.infoLogs,logs.idLog);

    if(canCommit){

        await t.commit();
    }
                                                              
    return res.status(response.CODE).json(response);  

}

const generateResponse206 = async ({message,error},res)=>{

    let response = genericResponse.success(
                   genericMessage.partial.CODE,
                   genericMessage.partial.STATUS,
                   message,
                   [{msg:error}]);    

    return res.status(response.CODE).json(response);

}

const generateResponse400 = async ({message,error,canRollback=false},res,t, logs )=>{

    const response = genericResponse.error(
                     genericMessage.error400.CODE,
                     genericMessage.error400.STATUS,
                     message,
                     [{msg:error}]);
    
    logs.infoLogs.responseBody = JSON.stringify(response).slice(0,2500);

    await LogsServices.update(logs.infoLogs,logs.idLog);

    if(canRollback){

        await t.rollback();
    }
                                                                                       
    return res.status(response.CODE).json(response);  



}

const generateResponseFields400 = async (message,error,res,infoLogs)=>{

    const response = genericResponse.error(
                     genericMessage.error400.CODE,
                     genericMessage.error400.STATUS,
                     message,
                     error);

    infoLogs.responseBody = JSON.stringify(response).slice(0,2500);
    if(!infoLogs.email){
        infoLogs.email='000000'
    } else{
        infoLogs.email=''
    } 

    console.log(infoLogs);
    await LogsServices.create(infoLogs);                 

    return res.status(response.CODE).json(response);

}

const generateResponse401 = async (message,error,res )=>{

    const response = genericResponse.error(
                     genericMessage.error401.CODE,
                     genericMessage.error401.STATUS,
                     message,
                     error);
    
    return res.status(response.CODE).json(response);
}

const generateResponse500 = async ({message,canRollback=false},res,t,logs)=>{

    const response = genericResponse.error(
                     genericMessage.error500.CODE,
                     genericMessage.error500.STATUS,
                     message,
                     [{error}]);

    logs.infoLogs.responseBody = JSON.stringify(response).slice(0,2500);

    await LogsServices.update(logs.infoLogs,logs.idLog);

    if(canRollback){

        await t.rollback();
    }
                                                                               
    return res.status(response.CODE).json(response);  

}


const generateResponse501 = async ({message,canRollback=true},res,t,logs)=>{


    const response = genericResponse.error(
                     genericMessage.error501.CODE,
                     genericMessage.error501.STATUS,
                     message);

    logs.infoLogs.responseBody = JSON.stringify(response).slice(0,2500);

    await LogsServices.update(logs.infoLogs,logs.idLog);

    if(canRollback){

        await t.rollback();
    }
                                                                               
    return res.status(response.CODE).json(response);  

}

module.exports = {

    generateResponse200,
    generateResponse201,
    generateResponse206,
    generateResponse400,
    generateResponseFields400,
    generateResponse401,
    generateResponse500,
    generateResponse501   
}