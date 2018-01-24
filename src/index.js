'use strict'

const express = require('express');
const cors = require('cors');

const Sequelize = require('sequelize');
const graphql = require('graphql');

const dsn = 'postgres://user:password@localhost:5432/database';

const sequelize = new Sequelize(dsn);
const graphQLMiddleware = require('./graphql')(Sequelize, sequelize);

const { ListModel } = require('./list')(Sequelize, sequelize, graphql);
const { ItemModel } = require('./item')(Sequelize, sequelize, graphql);

const syncList = ListModel.sync({force: false});
const syncItem = ItemModel.sync({force: false});

let app = express();

app.use(cors());
app.use('/graphql', graphQLMiddleware);

const ready = () => {
  app.listen(4000);
  console.log('Running a GraphQL API server at localhost:4000/graphql');
}

Promise.all([syncList, syncItem]).then(ready);
