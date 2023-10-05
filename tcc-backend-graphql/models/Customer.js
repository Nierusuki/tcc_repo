const { DataTypes } = require("sequelize");
const sqlize = require("../utils/DbConn");

const Customer = sqlize.define('Customer', {
    email: {
        type:DataTypes.STRING,
        primaryKey:true,
        validate: {
            is:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        }
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    }
}, {timestamps:false})

module.exports = Customer;

