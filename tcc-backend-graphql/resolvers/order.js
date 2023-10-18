const Order = require('../models/Order')
const Customer = require('../models/Customer')
const Product = require('../models/Product');

async function validateProducts(products) {
    let itemAmount = 0;
    let total = 0;
    for (const product of products) {
        let foundProduct = await Product.findByPk(product.serial);
        if (!foundProduct) {
            return {
                status:"notOk",
                error:`Could not find product for serial ${product.serial}`
            }
        }
        else if (!product.itemAmount || product.itemAmount < 1) {
            return {
                status:"notOk",
                error:"Item amount for product can not be less than 1"
            }
        }
        else {
            total += parseFloat(foundProduct.dataValues.value) * product.itemAmount
            itemAmount += product.itemAmount;
        }
    }
    return {status:"ok", itemCount:itemAmount, total:total}
}

module.exports = {
    Mutation: {
        async placeOrder(root, args, context) {
            let basicPl = {"protocol":"", "status":"", "orderDate":"", "itemAmount":0, total:0, CustomerEmail:"", products:[], "error":""}
            const {protocol, status, orderDate, CustomerEmail, products} = args.input;
            const customer = await Customer.findByPk(CustomerEmail)
            let parsedDate;
            try {
                parsedDate = new Date(orderDate).toJSON();
            }
            catch (e) {
                basicPl.error = "InvalidDate"
                return basicPl; 
            }

            if (customer === null) {
                basicPl.error = "NoCustomerFound"
                return basicPl; 
            }
            let parsedProducts = await validateProducts(products)

            if (parsedProducts.status == 'ok') {
                let order = await Order.create({
                    protocol:protocol, 
                    status:status, 
                    orderDate:parsedDate, 
                    itemAmount:parsedProducts.itemCount, 
                    total:parsedProducts.total,
                    CustomerEmail:CustomerEmail
                })
                
                for (product of products) {
                    await order.addProduct(product.serial, {through: {productAmount:product.itemAmount}})
                }

                order = await Order.findByPk(order.protocol, {include:Product});
                order.dataValues.orderDate = order.dataValues.orderDate.toJSON();
                return order;
            }
            else {
                basicPl.error = 'ProductError:' + parsedProducts.error 
                return basicPl;
            }

        },

        async cancelOrder(root, args, context) {
            const {protocol} = args.input
            let basicPl = {"protocol":"", "status":"", "orderDate":"", "itemAmount":0, total:0, CustomerEmail:"", products:[], "error":""}
            console.log(protocol)
            let order = await Order.findByPk(protocol)
            if (!order) {
                basicPl.error = "NoOrderFound"
                return basicPl;
            }
            await order.removeProducts()
            await order.destroy({where: {protocol:protocol}})

            order.dataValues.orderDate = order.dataValues.orderDate.toJSON();
            return order;
        }
    },
     Query: {
        async getOrder(root, {protocol}, context) {
            let order = await Order.findByPk(protocol, {include:Product})
            order.dataValues.orderDate = order.dataValues.orderDate.toJSON();
            return order;
        }
    }
}