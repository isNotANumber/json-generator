const generatorList = [
  {
    id: 1,
    key: 'bla?',
    value: 'blablabla',
  },
  {
    id: 2,
    key: 'bla?',
    value: [
      {
        id: 15,
        key: 'bla?',
        value: 'blablabla',
      },
    ],
  },
  {
    id: 3,
    key: 'bla?',
    value: [
      {
        id: 47,
        key: 'bla?',
        value: 'blablabla',
      },
    ],
  },
  {
    id: 50,
    key: 'bla?',
    value: 'blablabla',
  },
];

class GeneratorListModel {
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
