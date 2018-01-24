'use strict'

module.exports = (graphql, itemType, Item) => {
  const getItem = {
    type: itemType,
    args: {
      id: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      },
    },
    resolve: function (_, { id }) {
      return Item.read(id);
    }
  };

  const getItems = {
    type: new graphql.GraphQLList(itemType),
    resolve: function (_, { }) {
      return Item.readAll();
    }
  };

  return { getItem, getItems };
}
