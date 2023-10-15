const { Sequelize } = require('sequelize');

const sqlize = new Sequelize('commerce_graphql', process.env.POSTGRES_USERNAME, process.env.POSTGRES_PASSWORD, {
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect:'postgres',
    logging: false
    //postgres://tcc_master:superuser@tcc_database.tcc_network:5432/commerce_rest
})

sqlize.syncDB = async function() {
    //Set models and define associations
    require('./createModels')
    await sqlize.sync({alter:true})
}

module.exports = sqlize;

