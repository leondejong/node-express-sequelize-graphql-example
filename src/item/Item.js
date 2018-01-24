'use strict'

module.exports = (ItemModel) => {
  class Item {
    constructor(id, listId, name, checked) {
      this.id = id;
      this.listId = listId;
      this.name = name;
      this.checked = checked;
    }
  
    static create(listId, name, checked) {
      return ItemModel.create({
        listId: listId,
        name: name,
        checked: checked,
      }).then((model) => {
        return Item.toInstance(model);
      });
    }

    static readAll() {
      return ItemModel.findAll().then((models) => {
        return models.map((model) => {
          return Item.toInstance(model);
        });
      });
    }
  
    static read(id) {
      return ItemModel.findById(id).then((model) => {
        return Item.toInstance(model);
      });
    }
  
    static update(id, listId, name, checked) {
      return ItemModel.update({
        listId: listId,
        name: name,
        checked: checked,
      }, {
        where: { id: id }
      }).then((rows) => {
        return Item.read(id);
      });
    }
  
    static delete(id) {
      return ItemModel.destroy({
        where: { id: id }
      }).then((rows) => {
        return null;
      });
    }

    static toInstance(model) {
      const id = model.get('id');
      const listId = model.get('listId');
      const name = model.get('name');
      const checked = model.get('checked');

      return new Item(id, listId, name, checked);
    }
  }

  return Item;
}
