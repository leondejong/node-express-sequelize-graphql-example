'use strict'

module.exports = (Sequelize, sequelize) => {
  const ListModel = sequelize.define('list', {
    name: {
      type: Sequelize.STRING,
    },
  });

  return ListModel;
}
