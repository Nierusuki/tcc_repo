const { DataTypes } = require('sequelize');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Product = require('../models/Product');
const OrderProducts = require('../models/OrderProducts');


//Define associations
Customer.hasMany(Order, {
    foreignKey:{
        name:'CustomerEmail',
        type:DataTypes.STRING
    }
});
Order.belongsTo(Customer);
Product.belongsToMany(Order, {through: OrderProducts})
Order.belongsToMany(Product, {through: OrderProducts})


