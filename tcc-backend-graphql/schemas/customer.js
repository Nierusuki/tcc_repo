const {gql} = require('apollo-server-express');

module.exports = gql`
    type Customer {
        email: String!
        name: String!
        address: String!
    }

    type CustomerResponse {
        email: String!
        name: String!
        address: String!
    }

    input CustomerInput {
        email: String!
        name: String!
        address: String!
    }

    extend type Query {
        getAllCustomers: [Customer!]
        getSingleCustomer(email: String!): Customer
    }


    extend type Mutation {
        createCustomer(input: CustomerInput!): CustomerResponse
    }

`