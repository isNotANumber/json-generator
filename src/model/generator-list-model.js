const generatorList = [
  {
    id: 1,
    key: 'bla1',
    value: 'blablabla1',
  },
  {
    id: 2,
    key: 'bla2',
    value: [
      {
        id: 15,
        key: 'bla15',
        value: 'blablabla15',
      },
    ],
  },
  {
    id: 3,
    key: 'bla3',
    value: [
      {
        id: 47,
        key: 'bla47',
        value: 'blablabla47',
      },
    ],
  },
  {
    id: 50,
    key: 'bla50',
    value: 'blablabla50',
  },
];

export default class GeneratorListModel {
  #generatorList = generatorList;

  get generatorItems() {
    return this.#generatorList;
  }

  appendToListById(id, newList) {
    return generatorList.map((item) => {
      if (item.id === id) {
        if (Array.isArray(item.value)) {
          item.value.push(...newList);
        } else {
          item.value = [item.value, ...newList];
        }
      }
      return item;
    });
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
