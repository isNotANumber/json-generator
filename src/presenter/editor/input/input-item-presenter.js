import { render } from '../../../framework/render.js';
import InputItemView from '../../../view/editor/input/input-item-view.js';

export default class InputItemPresenter {
  #container = null;
  #parentId = null;

  #inputItemComponent = null;

  constructor({ container, parentId }) {
    this.#container = container;
    this.#parentId = parentId;
  }

  init(item) {
    this.#renderInputItemComponent(item, this.#parentId, this.#container)
  }

  #renderInputItemComponent(item, parentId, container) {
    this.#inputItemComponent = new InputItemView({
      item: item,
      parentId: parentId,
    });

    render(this.#inputItemComponent, container);
  }
}
