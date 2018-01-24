'use strict'

module.exports = (Sequelize, sequelize) => {
  const graphql = require('graphql');
  const graphqlHTTP = require('express-graphql');

  const { listQuery, listMutation } = require('./list')(Sequelize, sequelize, graphql);
  const { itemQuery, itemMutation } = require('./item')(Sequelize, sequelize, graphql);

  const queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      list: listQuery.getList,
      lists: listQuery.getLists,
      item: itemQuery.getItem,
      items: itemQuery.getItems,
    }
  });
  
  const mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createList: listMutation.createList,
      updateList: listMutation.updateList,
      deleteList: listMutation.deleteList,
      createItem: itemMutation.createItem,
      updateItem: itemMutation.updateItem,
      deleteItem: itemMutation.deleteItem,
    }
  });
  
  const schema = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType,
  });
  
  const graphQLMiddleware = graphqlHTTP(async (request, response, graphQLParams) => ({
    schema: schema,
    graphiql: process.env.NODE_ENV !== 'production',
  }));
  

  return graphQLMiddleware;
}
