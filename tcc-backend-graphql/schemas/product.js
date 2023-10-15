const {gql} = require('apollo-server-express');

module.exports = gql`
    type Product {
        serial: String!
        name: String!
        category: String!
        value: Float!
    }

    type ProductResponse {
        serial: String!
        name: String!
        category: String!
        value: Float!
        error: String
    }

    input ProductInput {
        serial: String!
        name: String!
        category: String!
        value: Float!
    }
    
    input SerialInput {
        serial: String!
    }

    extend type Query {
        getAllProducts: [Product!]
        getSingleProduct(serial: String!): Product
    }

    extend type Mutation {
        createProduct(input: ProductInput!): ProductResponse
        deleteProduct(input: SerialInput!): ProductResponse
        updateProduct(input: ProductInput!): ProductResponse
    }

`