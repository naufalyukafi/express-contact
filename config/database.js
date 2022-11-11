const Sequelize = require('sequelize')

// create connection
const sequelizeConf = new Sequelize('contact_db', 'root', '', {
    host: "127.0.0.1",
    dialect: 'mysql',
    define: {
        charset: "utf8mb4",
    },
    timezone: "+07:00",
    retry: { max: 5 },
});

module.exports = sequelizeConf;