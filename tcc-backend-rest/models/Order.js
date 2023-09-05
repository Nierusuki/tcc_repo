const { DataTypes } = require("sequelize");
const sqlize = require("../utils/DbConn");

const Order = sqlize.define('Order', {
    protocol: {
        type:DataTypes.STRING,
        primaryKey:true
    },
    status: {
        type:DataTypes.STRING,
        allowNull:false
    },
    orderDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    itemAmount: {
        type:DataTypes.INTEGER,
        allowNull:false
    },
    total: {
        type:DataTypes.DECIMAL,
        allowNull:false
    }

}, {timestamps:false})

module.exports = Order;