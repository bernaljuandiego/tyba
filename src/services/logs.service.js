const logsModel = require('../models').logs;


const create = async(data)=>{

    return new Promise(async (resolve, reject) => {

        try {
  
            const response = await logsModel.create(data);
            resolve(response);
            
        }catch(error) {

            reject(error);

        }
    })
}

const update = async (data,id) => {

    return new Promise(async (resolve, reject) => {
    
        try {
    
            const result = await logsModel.update(data,{ where: {id}})
            resolve(result);
        
        }catch (error) {
            
            reject(error);
        }
    })
}

module.exports = {
    
    create,
    update
}
