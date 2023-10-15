const Customer = require('../models/Customer')

module.exports = {

    Mutation: {
        async createCustomer(root, args, context) {
            const {email, name, address} = args.input;
            return Customer.create({name, email, address})
        },

        async deleteCustomer(root, args, context) {
            const {email} = args.input;
            const customer = await Customer.findByPk(email)
            if (customer === null) {
                return {"email":"", "name":"", "address":"", "error":"NoCustomerFound"}
            }
            else {
                Customer.destroy({where: {
                    email:email
                }})
                return customer;
            }
        },
        async updateCustomer(root, args, context) {
            const {email, name, address} = args.input;
            const customerStatus = await Customer.update({name:name, address:address}, {where: {
                email:email
            }})

            if (customerStatus[0] > 0) {
                console.log("testing inside if")
                return Customer.findByPk(email)
            }
            else return {"email":"", "name":"", "address":"", "error":"NoRowsAffected"}
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

