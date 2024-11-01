import { generatorListTest, defaultListState } from './const';

export default class GeneratorListModel {
  #generatorList = generatorListTest;

  get generatorItems() {
    return this.#generatorList;
  }

  updateItemById(id, newProps, list = this.#generatorList) {
    for (let item of list) {
      if (item.id === id) {
        Object.assign(item, newProps);
        return;
      }
      if (Array.isArray(item.value)) {
        this.updateItemById(id, newProps, item.value);
      }
    }
  }

  appendItemById(id, newItem) {
    const item = this.#generatorList.find((item) => item.id === id);

    if (item) {
      if (Array.isArray(item.value)) {
        item.value.push(newItem);
      } else {
        item.value = [newItem];
      }
    }
  }

  removeItemById(id, list = this.#generatorList) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        list.splice(i, 1);
        return;
      }
      if (Array.isArray(list[i].value)) {
        this.removeItemById(list[i].value, id);
        if (list[i].value.length === 0) {
          list[i].value = '';
        }
      }
    }
  }
}
