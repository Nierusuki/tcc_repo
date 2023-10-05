const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const context = require('./context');
const app = express();

app.use(cors());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true
});

apolloServer.start().then(res => {
  apolloServer.applyMiddleware({ app, path: '/api' });
})



const server = createServer(app);

module.exports = server;