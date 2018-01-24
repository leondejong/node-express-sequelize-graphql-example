'use strict'

module.exports = (Sequelize, sequelize) => {
  const ItemModel = sequelize.define('item', {
    name: {
      type: Sequelize.STRING,
    },
    checked: {
      type: Sequelize.BOOLEAN,
    },
  });

  return ItemModel;
}
