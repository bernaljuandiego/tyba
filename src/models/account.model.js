let bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);

module.exports = (sequelize, Sequelize) => {
    const account = sequelize.define("user", {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: Sequelize.STRING,
            validate: {
              isEmail: {
                msg: 'Se requiere un correo eletrónico válido.'
              }
            },
            unique: {
              msg: 'El correo electrónico ya existe.'
            }
        },
        password: {
            type: Sequelize.STRING,
      
        }
    },
    {
      hooks: {
        beforeCreate: (account) => {
          account.password = bcrypt.hashSync(account.password, salt);
        }
      }
    }
    );
    return account;
  };