const Sequelize = require('sequelize');
const dbConfig = require('../configuration/databases.config');

const sequelize = new Sequelize(dbConfig.DB_URL, {
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    },
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    },
    timezone: '-05:00',
    logging:false
  });
  
  let db = {};
  
  db.sequelize = sequelize;
  
  db.account = require("./account.model.js")(sequelize, Sequelize);
  db.logs = require("./logs.model.js")(sequelize, Sequelize);

module.exports = db;