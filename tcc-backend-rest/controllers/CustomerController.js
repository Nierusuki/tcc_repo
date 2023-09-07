const Customer = require('../models/Customer')


const getCustomer = ((req, res) => {
    Customer.findByPk(req.params.email).then(customer => {
        if (!customer) {
            res.status(404)
            res.send("Could not find record for provided email")
        }
        else {
            res.json(customer);
        }
    }).catch(error => {
        res.status(500);
        res.send(error)
    })
})

const getCustomers = ((req, res, next) => {
    Customer.findAll().then(customers => {
        res.json(customers)
    }).catch(next)
})

const updateCustomer = ((req, res) => {
    const body = req.body
    var paramsEmail = req.params.email
    if (!paramsEmail) {
        res.send("Missingparameter: email")
        res.status(400)
        return;
    }

    var bodyName = body.name ?? null
    var bodyAddress = body.address ?? null
    if (!bodyName || !bodyAddress) {
        res.status(400)
        res.send("Missing fields, please specify name and address")
        return; 
    }
    else {
        Customer.update({name:bodyName, address:bodyAddress}, {
            where: {
                email:paramsEmail
        }, returning:true}).then(customer => {
            //check if any records have been changed
            if (customer[0] == 0) {
                res.status(404)
                res.send('Could not find record to update')
                return;
            }
            res.status(202)
            res.json(customer)
            return;
        }).catch(error => {
            res.status(500)
            res.send(error.parent.detail)
        })
    }
    
})

const createCustomer = ((req, res) => {
    let body = req.body
    if (!body.hasOwnProperty('email')) {
        res.status(400)
        res.send("Missing body parameter: email")
        return;
    }
    if (!body.hasOwnProperty('name')) {
        res.status(400)
        res.send("Missing body parameter: name")
        return; 
    }
    if (!body.hasOwnProperty('address')) {
        res.status(400)
        res.send("Missing body parameter: address")
        return;
    }

    Customer.create({email:body.email,name:body.name, address:body.address}).then(customer => {
        res.status(202)
        res.json(customer)
        return;
    }).catch(error => {
        res.status(500)
        res.send(error.parent.detail)
    })
}) 

const deleteCustomer = ((req, res) => {
    let email = req.params.email
    if (!email) {
        res.status(404)
        res.send("Could not find record for provided email")
        return;
    }
    else {
        Customer.destroy({where: {
            email:email
        }}).then(() => {
            res.status(200);
            res.send()
        }).catch(error => {
            res.status(500)
            res.send(error.parent.detail)
        })
    }

})


module.exports = {
    getCustomer:getCustomer,
    getCustomers:getCustomers,
    createCustomer:createCustomer,
    updateCustomer:updateCustomer,
    deleteCustomer:deleteCustomer
}

