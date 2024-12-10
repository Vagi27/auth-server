require("dotenv").config();

module.exports = {
    environment: {
        development: {
            port: process.env.PORT,
            host: process.env.HOST,
        },
    },
    JWT_Secret_Key: process.env.JWT_Secret_Key,
};
