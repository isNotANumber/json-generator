import { generatorListTest, defaultListState } from './const';

export default class EditorOutputModel {
  #generatorList = generatorListTest;

  get generatorItems() {
    return this.#convertToJson();
  }

  #convertToJson() {
    return JSON.stringify(this.#generatorList, null, 2);
  }
}
