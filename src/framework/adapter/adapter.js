
export default class Adapter {

  static convertInputItemsToModel(items) {
    const output = [];

    items.forEach(item => {
      const itemObj = item.parseStateToObject();

      if (itemObj.parentId === null) {
        delete itemObj.parentId;
        output.push(itemObj);
      } else {
        this.#appendElementById(output, itemObj.parentId, itemObj);
        delete itemObj.parentId;
      }
      
    });

    return output;
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
