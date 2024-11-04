import { generatorListTest, defaultListState } from './const';

export default class EditorOutputModel {
  #outputJson = this.#convertToJson(generatorListTest);

  get outputJson() {
    return this.#outputJson;
  }

  updateData(data) {
    this.#outputJson = this.#convertToJson(data);
  }

  setDefaultData() {
    this.#outputJson = this.#convertToJson(generatorListTest);
  }

  #convertToJson(data) {
    return JSON.stringify(data, null, 2);
  }
}
