const { DataTypes } = require("sequelize");
const sqlize = require("../utils/DbConn");
const Product = require("./Product");
const Order = require("./Order");

const OrderProducts = sqlize.define('OrderProducts', {
    ProductSerial: {
        type:DataTypes.STRING,
        references: {
            model:Product,
            key:'serial'
        },
        primaryKey:true
    },
    OrderProtocol: {
        type:DataTypes.STRING,
        references: {
            model:Order,
            key:'protocol'
        },
        primaryKey:true
    },
    productAmount: {
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
}, {timestamps:false})

module.exports = OrderProducts