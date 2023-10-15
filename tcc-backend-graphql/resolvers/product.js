const Product = require('../models/Product')

module.exports = {

    Mutation: {
        async createProduct(root, args, context) {
            const {serial, name, category, value} = args.input;
            return Product.create({serial, name, category, value})
        },

        async deleteProduct(root, args, context) {
            const {serial} = args.input;
            const product = await Product.findByPk(serial)
            if (product === null) {
                return {"serial":"", "name":"", "category":"", "value":0, "error":"NoProductFound"}
            }
            else {
                Product.destroy({where: {
                    serial:serial
                }})
                return product;
            }
        },
        async updateProduct(root, args, context) {
            const {serial, name, category, value} = args.input;
            const productStatus = await Product.update({name:name, category:category, value:value}, {where: {
                serial:serial
            }})

            if (productStatus[0] > 0) {
                return Product.findByPk(serial)
            }
            return {"serial":"", "name":"", "category":"", "value":0, "error":"NoRowsAffected"}
        }
    },
     Query: {
        async getAllProducts(root, args, context) {
            return Product.findAll();
        },
        async getSingleProduct(root, {serial}, context) {
            return Product.findByPk(serial);
        }
    }

}

