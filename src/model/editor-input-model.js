import { generatorListTest, defaultListState } from './const';

export default class EditorInputModel {
  #generatorItems = generatorListTest;

  get generatorItems() {
    return this.#generatorItems;
  }

  set data(data) {
    this.#generatorItems = data;
  }

  setDefaultData() {
    this.#generatorItems = generatorListTest;
  }
}
