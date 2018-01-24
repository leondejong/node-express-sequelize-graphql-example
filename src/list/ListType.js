'use strict'

let listType;

module.exports = (graphql, itemType) => {
  // Return singleton to avoid duplicate types in schema definition
  if (listType) return listType;

  listType = new graphql.GraphQLObjectType({
    name: 'List',
    fields: {
      id: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      },
      name: {
        type: graphql.GraphQLString,
      },
      items: {
        type: new graphql.GraphQLList(itemType),
      },
    }
  });

  return listType;
}
