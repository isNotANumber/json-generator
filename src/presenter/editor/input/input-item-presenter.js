import { render, remove } from '../../../framework/render.js';
import InputItemView from '../../../view/editor/input/input-item-view.js';

export default class InputItemPresenter {
  #container = null;
  #parentId = null;

  #inputItemComponent = null;

  constructor({ container, parentId }) {
    this.#container = container;
    this.#parentId = parentId;
  }

  get component() {
    return this.#inputItemComponent;
  }

  get element() {
    return this.#inputItemComponent.element;
  }

  get parentId() {
    return this.#parentId;
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

  updateItemState(props) {
    this.#inputItemComponent._setState({...props});
  }

  destroy() {
    remove(this.#inputItemComponent);
  }
}
