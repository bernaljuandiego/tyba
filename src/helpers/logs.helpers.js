let infoLogs = {

    nameService : '',
    email : '',
    description : '',
    method : '',
    urlService : '',
    requestBody : '',
    responseBody : ''
};


const setInfoLogs = ({nameService,email,description,urlService,requestBody,responseBody,method})=>{
    
    infoLogs.nameService = nameService;
    infoLogs.email = email;
    infoLogs.description = description;
    infoLogs.urlService = urlService;
    infoLogs.requestBody = requestBody.slice(0,2500);
    infoLogs.responseBody = responseBody.slice(0,2500);
    infoLogs.method = method;
}

const getInfoLogs = ()=>{
    
    return infoLogs;
}

module.exports = {
    getInfoLogs,
    setInfoLogs,

}