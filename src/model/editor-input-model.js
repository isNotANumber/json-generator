import { defaultListState, testList1, testList2 } from './const';

/**
 * Model class for managing editor input data.
 */
export default class EditorInputModel {
  #data = testList2;

  /**
   * Gets the current data.
   * @returns {Array} The array of current data.
   */
  get data() {
    return this.#data;
  }

  /**
   * Sets the data to the new data.
   * @param {Array} data - The new data to set as data.
   */
  set data(newData) {
    this.#data = newData;
  }

  /**
   * Resets the data to their default state.
   */
  setDefaultData() {
    this.#data = testList2;
  }
}
