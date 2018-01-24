'use strict'

module.exports = (graphql, listType, List) => {
  const getList = {
    type: listType,
    args: {
      id: {
        type: new graphql.GraphQLNonNull(graphql.GraphQLID),
      },
    },
    resolve: function (_, { id }) {
      return List.read(id);
    }
  };

  const getLists = {
    type: new graphql.GraphQLList(listType),
    resolve: function (_, { }) {
      return List.readAll();
    }
  };

  return { getList, getLists };
}
