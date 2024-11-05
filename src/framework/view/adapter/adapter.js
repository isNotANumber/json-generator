import GeneratorItemView from '../../../view/generator/generator-item-view';

export default class Adapter {
  static convertModelDataToInputItems(data, parentId = null, result = {}) {
    for (const item of Object.values(data)) {
      let currentGeneratorItem = null;

      if (Array.isArray(item.value)) {
        currentGeneratorItem = new GeneratorItemView({
          id: item.id,
          key: item.key,
          value: '',
          parentId: parentId,
        });
        this.convertModelDataToInputItems(item.value, item.id, result);
      } else {
        currentGeneratorItem = new GeneratorItemView({
          id: item.id,
          key: item.key,
          value: item.value,
          parentId: parentId,
        });
      }

      result[currentGeneratorItem.element.dataset.id] = currentGeneratorItem;
    }

    return result;
  }

  static convertInputItemsToModel(items) {
    const output = [];

    for (const item of Object.values(items)) {
      const itemObj = this.#convertItemComponentToObject(item);

      if (itemObj.parentId === 'null') {
        delete itemObj.parentId;
        output.push(itemObj);
      } else {
        this.#appendElementById(output, itemObj.parentId, itemObj);
        delete itemObj.parentId;
      }
    }

    return output;
  }

  static #convertItemComponentToObject(item) {
    const { id, parentId } = item.element.dataset;
    const { key, value } = item._state;

    return { id, parentId, key, value };
  }

  static #appendElementById(arr, id, newElement) {
    function recursiveAppend(arr) {
      for (let item of arr) {
        if (item.id === id) {
          if (!Array.isArray(item.value)) {
            item.value = [];
          }
          item.value.push(newElement);
          return true;
        }
        if (item.value && recursiveAppend(item.value)) {
          return true;
        }
      }
      return false;
    }

    recursiveAppend(arr);
  }
}
