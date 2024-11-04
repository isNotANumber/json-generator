import { generatorListTest, defaultListState } from './const';

export default class EditorOutputModel {
  #outputJson = this.#convertToJson({});

  get outputJson() {
    return this.#outputJson;
  }

  set data(data) {
    this.#outputJson = this.#convertToJson(data);
  }

  setDefaultData() {
    this.#outputJson = this.#convertToJson({});
  }

  #convertToJson(data) {
    return JSON.stringify(data, null, 2);
  }
}
