const {gql} = require('apollo-server-express');

module.exports = gql`


    type ProductDetail {
        ProductSerial: String!
        OrderProtocol: String!
        productAmount: Int!
    }

    type OrderProduct {
        serial: String!
        name: String!
        category: String!
        OrderProducts: ProductDetail!
    }

    input OrderProductInput {
        serial: String!
        itemAmount: Int!
    } 

    type Order {
        protocol: String!
        status: String!
        orderDate: String!
        itemAmount: Int!
        total: Float!
        CustomerEmail: String!
        Products: [OrderProduct!]
    }

    type OrderResponse {
        protocol: String!
        status: String!
        orderDate: String!
        itemAmount: Int!
        total: Float!
        CustomerEmail: String!
        Products: [OrderProduct!]
        error: String
    }

    input OrderInput {
        protocol: String!
        status: String!
        orderDate: String!
        CustomerEmail: String!
        products: [OrderProductInput!]
    }
    
    input ProtocolInput {
        protocol: String!
    }

    extend type Query {
        getOrder(protocol: String!): Order
    }

    extend type Mutation {
        placeOrder(input: OrderInput!): OrderResponse
        cancelOrder(input: ProtocolInput!): OrderResponse
    }

`