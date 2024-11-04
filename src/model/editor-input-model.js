import { generatorListTest, defaultListState } from './const';

export default class EditorInputModel {
  #generatorList = generatorListTest;

  get generatorItems() {
    return this.#generatorList;
  }

  updateData(data) {
    this.#generatorList = data;
  }

  setDefaultData() {
    this.#generatorList = generatorListTest;
  }
}
