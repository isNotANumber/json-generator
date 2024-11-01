const generatorList = [
  {
    id: '1',
    key: 'bla1',
    value: 'blablabla1',
  },
  {
    id: '2',
    key: 'bla2',
    value: [
      {
        id: '15',
        key: 'bla15',
        value: 'blablabla15',
      },
    ],
  },
  {
    id: '3',
    key: 'bla3',
    value: [
      {
        id: '47',
        key: 'bla47',
        value: 'blablabla47',
      },
    ],
  },
  {
    id: '50',
    key: 'bla50',
    value: 'blablabla50',
  },
];

export default class GeneratorListModel {
  #generatorList = generatorList;

  get generatorItems() {
    return this.#generatorList;
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

  removeItemById(list, id) {
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

  searchById(arr, id) {
    for (let item of arr) {
      if (item.id === id) {
        return item;
      }
      if (Array.isArray(item.value)) {
        const found = searchById(item.value, id);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
}
