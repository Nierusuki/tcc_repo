const Product = require('../models/Product')

const getProduct = ((req, res) => {
    Product.findByPk(req.params.serial).then(product => {
        if (!product) {
            res.status(404)
            res.send("Could not find record for provided serial")
        }
        else {
            res.json(product);
        }
    }).catch(error => {
        res.status(500);
        res.send(error)
    })
})

const getProducts = ((req, res, next) => {
    Product.findAll().then(products => {
        res.json(products)
    }).catch(next)
})

const updateProduct = ((req, res) => {
    const body = req.body
    var paramsSerial = req.params.serial
    if (!paramsSerial) {
        res.send("Missing parameter: serial")
        res.status(400)
        return;
    }

    var bodyName = body.name ?? null
    var bodyCategory = body.category ?? null
    var bodyValue = body.value ?? null
    if (!bodyName || !bodyCategory || !bodyValue) {
        res.status(400)
        res.send("Missing fields, please specify name, category and value")
        return; 
    }
    else {
        Product.update({name:bodyName, category:bodyCategory, value:bodyValue}, {
            where: {
                serial:paramsSerial
        }, returning:true}).then(product => {
            //check if any records have been changed
            if (product[0] == 0) {
                res.status(404)
                res.send('Could not find record to update')
                return;
            }
            res.status(202)
            res.json(product)
            return;
        }).catch(error => {
            res.status(500)
            res.send(error.parent.detail)
        })
    }
    
})

const createProduct = ((req, res) => {
    let body = req.body
    if (!body.hasOwnProperty('serial')) {
        res.status(400)
        res.send("Missing key parameter: serial")
        return;
    }
    if (!body.hasOwnProperty('name')) {
        res.status(400)
        res.send("Missing body parameter: name")
        return; 
    }
    if (!body.hasOwnProperty('category')) {
        res.status(400)
        res.send("Missing body parameter: category")
        return;
    }

    if (!body.hasOwnProperty('value')) {
        res.status(400)
        res.send("Missing body parameter: value")
        return;
    }

    Product.create({serial:body.serial,name:body.name, category:body.category, value:body.value}).then(product => {
        res.status(202)
        res.json(product)
        return;
    }).catch(error => {
        res.status(500)
        res.send(error.parent.detail)
    })
}) 

const deleteProduct = ((req, res) => {
    let serial = req.params.serial
    if (!serial) {
        res.status(404)
        res.send("Could not find product for provided serial")
        return;
    }
    else {
        Product.destroy({where: {
            serial:serial
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
    getProduct:getProduct,
    getProducts:getProducts,
    createProduct:createProduct,
    updateProduct:updateProduct,
    deleteProduct:deleteProduct
}

