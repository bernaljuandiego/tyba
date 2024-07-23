const config = {
    PORT: process.env.PORT || '3001',
    API_VERSION: process.env.API_VERSION || '/v1',
    API_PATH: process.env.API_PATH || '/api',
    NODE_ENV: process.env.NODE_ENV || 'production',
    SECRET: process.env.SECRET || 'super secret',
    JWTEXPIRATION: process.env.SECRET || '10h', 
    ALGORITHM: "HS256",
    PAIS:'col',
};
module.exports = config