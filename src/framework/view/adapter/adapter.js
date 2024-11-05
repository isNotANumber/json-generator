import InputItemView from '../../../view/input/input-item-view';

/**
 * Adapter class for converting model data to input items and vice versa.
 */
export default class Adapter {
  /**
   * Converts model data into input items.
   *
   * @param {Object} data - The model data to be converted.
   * @param {string|null} [parentId=null] - The ID of the parent item.
   * @param {Object} [result={}] - The resulting object to store input items.
   * @returns {Object} The converted input items.
   */
  static convertModelDataToInputItems(data, parentId = null, result = {}) {
    for (const item of Object.values(data)) {
      let currentGeneratorItem = null;

      if (Array.isArray(item.value)) {
        currentGeneratorItem = new InputItemView({
          id: item.id,
          key: item.key,
          value: '',
          parentId: parentId,
          inputValueDisabled: true,
        });
        this.convertModelDataToInputItems(item.value, item.id, result);
      } else {
        currentGeneratorItem = new InputItemView({
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

  /**
   * Converts input items to model data.
   *
   * @param {Object} items - The input items to be converted.
   * @returns {Array} The converted model data.
   */
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

  /**
   * Converts an input item component to a plain object.
   *
   * @param {InputItemView} item - The input item to convert.
   * @returns {Object} The plain object representing the item.
   * @private
   */
  static #convertItemComponentToObject(item) {
    const { id, parentId } = item.element.dataset;
    const { key, value } = item._state;

    return { id, parentId, key, value };
  }

  /**
   * Appends a new element to an array based on the specified ID.
   *
   * @param {Array} arr - The array to append to.
   * @param {string} id - The ID of the element to append to.
   * @param {Object} newElement - The new element to append.
   * @private
   */
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
