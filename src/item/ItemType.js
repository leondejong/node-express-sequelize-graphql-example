'use strict'

let itemType;

module.exports = (graphql) => {
  // Return singleton to avoid duplicate types in schema definition
  if (itemType) return itemType;

  itemType = new graphql.GraphQLObjectType({
    name: 'Item',
    fields: {
      id: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      },
      listId: {
        type: graphql.GraphQLID,
      },
      name: {
        type: graphql.GraphQLString,
      },
      checked: {
        type: graphql.GraphQLBoolean,
      },
    }
  });

  return itemType;
}
