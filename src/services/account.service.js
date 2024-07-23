const Account = require('../models').account;

const genericError = require('../helpers/generic-errors.helper')


const create = async (data, t) => {

    return new Promise(async (resolve, reject) => {

        let mail = data.email
        let account = new Account({ email: mail.toLowerCase(), password: data.password });

        try {

            let result = await account.save({ transaction: t });
            resolve(result);

        } catch (error) {

            let err = genericError.setErrors(error)
            reject(err);
        }
    })
}

const buscarEmail = async (email) => {
    const existe = await Account.findOne({ where: { email } })
    return existe;
}

module.exports = {
    create,
    buscarEmail
}


