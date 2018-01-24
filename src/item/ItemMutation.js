'use strict'

module.exports = (graphql, itemType, Item) => {
  const createItem = {
    type: itemType,
    args: {
      listId: {
        type: graphql.GraphQLID,
      },
      name: {
        type: graphql.GraphQLString,
      },
      checked: {
        type: graphql.GraphQLBoolean,
      },
    },
    resolve: function (_, { listId, name, checked }) {
      return Item.create(listId, name, checked);
    }
  };

  const updateItem = {
    type: itemType,
    args: {
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
    },
    resolve: function (_, { id, listId, name, checked }) {
      return Item.update(id, listId, name, checked);
    }
  };

  const deleteItem = {
    type: itemType,
    args: {
      id: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      },
    },
    resolve: function (_, { id }) {
      return Item.delete(id);
    }
  };

  return { createItem, updateItem, deleteItem };
}
