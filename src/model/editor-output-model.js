/**
 * Model class for managing the output data in JSON format.
 */
export default class EditorOutputModel {
  #outputJson = this.#convertToJson({});

  /**
   * Gets the current output JSON representation.
   * @returns {string} The current output JSON string.
   */
  get outputJson() {
    return this.#outputJson;
  }

  /**
   * Sets the output data, converting it to JSON format.
   * @param {Object} data - The new data to set, which will be converted to JSON.
   */
  set data(data) {
    this.#outputJson = this.#convertToJson(data);
  }

  /**
   * Resets the output data to an empty JSON object representation.
   */
  setDefaultData() {
    this.#outputJson = this.#convertToJson({});
  }

  /**
   * Converts the provided data to a JSON string.
   * @param {Object} data - The data to convert to JSON.
   * @returns {string} The JSON string representation of the data.
   * @private
   */
  #convertToJson(data) {
    return JSON.stringify(data, null, 2);
  }
}
