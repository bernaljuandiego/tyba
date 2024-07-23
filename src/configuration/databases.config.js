const database_config = {
    DB_URL: process.env.DB_URL || 'mysql://root:DmHVGOZSvoaDLicHCgZXtccuMxnlUWFH@monorail.proxy.rlwy.net:38233/railway',
    dialect: 'mysql',
    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

module.exports = database_config;