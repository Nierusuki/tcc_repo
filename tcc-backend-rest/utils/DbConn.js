const { Sequelize } = require('sequelize');

const sqlize = new Sequelize('database', process.env.POSTGRES_USERNAME, process.env.POSTGRES_PASSWORD, {
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect:'postgres',
    logging:'false'

})

module.exports = sqlize;