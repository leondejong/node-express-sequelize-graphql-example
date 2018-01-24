'use strict'

module.exports = (ListModel, ItemModel, Item) => {
  class List {
    constructor(id, name, items) {
      this.id = id;
      this.name = name;
      this.items = items;
    }
  
    static create(name) {
      return ListModel.create({
        name: name,
      }).then((model) => {
        return List.toInstance(model);
      });
    }

    static readAll() {
      return ListModel.findAll({ include: [ ItemModel ] }).then((models) => {
        return models.map((model) => {
          return List.toInstance(model);
        });
      });
    }
  
    static read(id) {
      return ListModel.findById(id, { include: [ ItemModel ] }).then((model) => {
        return List.toInstance(model);
      });
    }
  
    static update(id, name) {
      return ListModel.update({
        name: name,
      }, {
        where: { id: id }
      }).then((rows) => {
        return List.read(id);
      });
    }
  
    static delete(id) {
      return ListModel.destroy({
        where: { id: id }
      }).then((rows) => {
        return null;
      });
    }

    static toInstance(model) {
      const id = model.get('id');
      const name = model.get('name');
      let items = model.get('items');

      if (items) {
        items = items.map((model) => {
          return Item.toInstance(model);
        });
      } else {
        items = [];
      }

      return new List(id, name, items);
    }
  }

  return List;
}
