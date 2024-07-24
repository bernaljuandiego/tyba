const database_config = {
    DB_URL: process.env.DB_URL || 'mysql://root:WwSiOnCECgyLPaKxffMMgSKncDWzIEWC@monorail.proxy.rlwy.net:15312/railway',
    dialect: 'mysql',
    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

module.exports = database_config;