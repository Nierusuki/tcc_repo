const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Product = require('../models/Product');

const placeOrder = (async (req, res) => {
    try {
        if (!req.body.customerEmail) {
            throw "Missing field 'customerEmail' to place order"
        }
        if (!req.body.products || !((Array.isArray(req.body.products)) && req.body.products.length != 0)) {
            throw "Missing array field 'products' to place order"
        }

        let statusProducts = await validateProducts(req.body.products);
        if (statusProducts.status != 'ok') {
            throw statusProducts.error
        }

        const order = await Order.create({
            protocol:req.body.protocol,
            status:req.body.status,
            orderDate:req.body.orderDate,
            itemAmount:statusProducts.itemCount,
            total:statusProducts.total,
            CustomerEmail:req.body.customerEmail
        })

        req.body.products.forEach(product => {
            order.addProduct(product.serial, {through: {productAmount:product.quantity}})
        });
        res.status(201)
        res.json(order)
    }
    catch (error) {
        res.status(500)
        res.send("Internal server error: " + error)
    }
})

async function validateProducts(products) {
    let itemAmount = 0;
    let total = 0;
    for (const product of products) {
        let foundProduct = await Product.findByPk(product.serial);
        console.log(foundProduct)
        if (!foundProduct) {
            return {
                status:"notOk",
                error:`Could not find product for serial ${product.serial}`
            }
        }
        else if (!product.quantity || product.quantity < 1) {
            return {
                status:"notOk",
                error:"Item amount for product can not be less than 1"
            }
        }
        else {
            total += parseFloat(foundProduct.dataValues.value) * product.quantity
            itemAmount += product.quantity;
        }
    }
    console.log(total);
    return {status:"ok", itemCount:itemAmount, total:total}
}

const getOrder = (async (req, res) => {
    const order = await Order.findByPk(req.params.protocol, {include:Product})
    if (!order) {
        res.status(404)
        res.send('Could not find order for provided protocol');
        return
    }
    res.json(order);
})

const cancelOrder = (async (req, res) => {
    if (!req.params.protocol) {
        res.status(400)
        res.send("Protocol was not provided")
    }
    else {
        let order = await Order.findByPk(req.params.protocol)
        if (!order) {
            res.status(404)
            res.send("Could not find order for provided protocol")
            return;
        }

        order.removeProducts({where: {
            protocol:req.params.protocol
        }})
        order.destroy({where: {
            protocol:req.params.protocol
        }})

        res.status(200)
        res.send();
        return
    }
})


module.exports = {
    placeOrder:placeOrder,
    getOrder:getOrder,
    cancelOrder:cancelOrder
}
