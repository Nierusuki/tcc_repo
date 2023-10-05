const { DataTypes } = require("sequelize");
const sqlize = require("../utils/DbConn");

const Product = sqlize.define('Product', {
    serial:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    category: {
        type:DataTypes.STRING
    },
    value: {
        type:DataTypes.DECIMAL,
        allowNull:false
    }
}, {timestamps:false})

module.exports = Product