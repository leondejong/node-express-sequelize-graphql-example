'use strict'

module.exports = (Sequelize, sequelize, graphql) => {
  const ListModel = require('../list/ListModel')(Sequelize, sequelize);

  const ItemModel = require('./ItemModel')(Sequelize, sequelize);
  ItemModel.belongsTo(ListModel);

  const Item = require('./Item')(ItemModel);
  const itemType = require('./ItemType')(graphql);
  const itemQuery = require('./ItemQuery')(graphql, itemType, Item);
  const itemMutation = require('./ItemMutation')(graphql, itemType, Item);

  return { ItemModel, Item, itemType, itemQuery, itemMutation };
}
