'use strict'

module.exports = (graphql, listType, List) => {
  const createList = {
    type: listType,
    args: {
      name: {
        type: graphql.GraphQLString,
      },
    },
    resolve: function (_, { name }) {
      return List.create(name);
    }
  };

  const updateList = {
    type: listType,
    args: {
      id: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      },
      name: {
        type: graphql.GraphQLString,
      },
    },
    resolve: function (_, { id, name }) {
      return List.update(id, name);
    }
  };

  const deleteList = {
    type: listType,
    args: {
      id: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      },
    },
    resolve: function (_, { id }) {
      return List.delete(id);
    }
  };

  return { createList, updateList, deleteList };
}
