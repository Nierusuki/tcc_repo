const express = require('express');
const CustomerController = require('./controllers/CustomerController');
const router = express.Router();


router.get('/', (req, res) => {
    res.send("Welcome! This is the RESTful service of my final paper for university.")
}) 

router.get('/customer', CustomerController.getCustomers)
router.get('/customer/:email', CustomerController.getCustomer)
router.put('/customer/:email', CustomerController.updateCustomer)
router.post('/customer', CustomerController.createCustomer)
router.delete('/customer/:email', CustomerController.deleteCustomer)

module.exports = router;