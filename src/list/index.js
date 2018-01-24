'use strict'

module.exports = (Sequelize, sequelize, graphql) => {
  const ItemModel = require('../item/ItemModel')(Sequelize, sequelize);
  const Item = require('../item/Item')(ItemModel);
  const itemType = require('../item/ItemType')(graphql);

  const ListModel = require('./ListModel')(Sequelize, sequelize);
  ListModel.hasMany(ItemModel);

  const List = require('./List')(ListModel, ItemModel, Item);
  const listType = require('./ListType')(graphql, itemType);
  const listQuery = require('./ListQuery')(graphql, listType, List);
  const listMutation = require('./ListMutation')(graphql, listType, List);

  return { ListModel, List, listType, listQuery, listMutation };
}
