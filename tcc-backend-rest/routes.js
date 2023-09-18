const express = require('express');
const CustomerController = require('./controllers/CustomerController');
const ProductController = require('./controllers/ProductController');
const OrderController = require('./controllers/OrderController');
const router = express.Router();


router.get('/', (req, res) => {
    res.send("Welcome! This is the RESTful service of my final paper for university.")
}) 

//Customer routes
router.get('/customer', CustomerController.getCustomers)
router.get('/customer/:email', CustomerController.getCustomer)
router.put('/customer/:email', CustomerController.updateCustomer)
router.post('/customer', CustomerController.createCustomer)
router.delete('/customer/:email', CustomerController.deleteCustomer)

//Product routes
router.get('/product', ProductController.getProducts)
router.get('/product/:serial', ProductController.getProduct)
router.put('/product/:serial', ProductController.updateProduct)
router.post('/product', ProductController.createProduct)
router.delete('/product/:serial', ProductController.deleteProduct)


//Order routes
router.post('/order', OrderController.placeOrder)
router.get('/order/:protocol', OrderController.getOrder)
router.delete('/order/:protocol', OrderController.cancelOrder)
module.exports = router;