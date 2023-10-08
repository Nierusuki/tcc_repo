const Customer = require('../models/Customer')

module.exports = {
    Mutation: {
        async createCustomer(root, args, context) {
            const {email, name, address} = args.input;
            return Customer.create({name, email, address})
        }
    },
    Query: {
        async getAllCustomers(root, args, context) {
            return Customer.findAll();
        },
        async getSingleCustomer(root, {email}, context) {
            return Customer.findByPk(email);
        }
    }
}

