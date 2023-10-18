const customerResolvers = require('./customer')
const productResolvers = require('./product')
const orderResolvers = require('./order')

module.exports = [customerResolvers, productResolvers, orderResolvers];