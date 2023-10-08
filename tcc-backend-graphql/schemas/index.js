const { gql } = require('apollo-server-express');
const customerType = require('./customer')

const rootType = gql`
 type Query {
     root: String
 }
 type Mutation {
     root: String
 }

`;

module.exports = [rootType, customerType];