import { defaultListState, testList1, testList2 } from './const';

/**
 * Model class for managing editor input data.
 */
export default class EditorInputModel {
  #generatorItems = testList2;

  /**
   * Gets the current generator items.
   * @returns {Array} The array of current generator items.
   */
  get generatorItems() {
    return this.#generatorItems;
  }

  /**
   * Sets the generator items to the provided data.
   * @param {Array} data - The new data to set as generator items.
   */
  set data(data) {
    this.#generatorItems = data;
  }

  /**
   * Resets the generator items to their default state.
   */
  setDefaultData() {
    this.#generatorItems = defaultListState;
  }
}
