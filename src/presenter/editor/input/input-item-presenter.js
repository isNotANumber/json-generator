import { render, remove } from '../../../framework/render.js';
import { generateRandomId } from '../../../util.js';
import ArrayItemView from '../../../view/editor/input/items/array-item-view.js';
import StringItemView from '../../../view/editor/input/items/string-item-view.js';
import ObjectItemView from '../../../view/editor/input/items/object-item-view.js';

export default class InputItemPresenter {
  #container = null;
  #parentComponent = null;
  #childComponents = new Map();

  constructor({ id, container }) {
    this.#container = container;
  }

  init(item) {
    this.#renderObjectTypeItem(this.#container);
  }

  // -- Render methods -- //

  #renderObjectTypeItem(container, props) {
    props = props ? props : { id: generateRandomId() };

    this.#parentComponent = new ObjectItemView({...props,});

    render(this.#parentComponent, container);
  }

  // -- Child methods -- //

  updateItemState(targetId, value) {
    const targetComponent = this.getComponentById(targetId);

    targetComponent._setState(value);
  }

  appendArrayItemPart(targetId) {
    const targetComponent = this.getComponentById(targetId);

    const arrayTypeItem = new ArrayItemView({
      id: generateRandomId(),
      parentId: targetId,
      rootObjId: this.#parentComponent.id,
    });
    this.#childComponents.set(arrayTypeItem.id, arrayTypeItem);

    render(arrayTypeItem, targetComponent.childrenContainer);

    if (this.#isBlockNeeded()) {
      this.#blockAppendControl();
    }
  }

  appendStringItemPart(targetId, props) {
    const targetComponent = this.getComponentById(targetId);

    props = props
      ? props
      : {
          id: generateRandomId(),
          parentId: targetId,
          rootObjId: this.#parentComponent.id,
        };

    const stringTypeItem = new StringItemView({ ...props });
    this.#childComponents.set(stringTypeItem.id, stringTypeItem);

    render(stringTypeItem, targetComponent.childrenContainer);

    if (this.#isBlockNeeded()) {
      this.#blockAppendControl();
    }
  }

  // refactor: childs components also should be erased from childComponents
  removeItemPart(targetId) {
    const targetComponent = this.getComponentById(targetId);

    remove(targetComponent);
    this.#childComponents.delete(targetId);

    if (!this.#isBlockNeeded()) {
      this.#unblockAppendControl();
    }

    console.log(this.#childComponents)
  }

  // -- Getters -- //

  // rewrite logic
  getItemAsObject() {
    const result = {
      key: this.#parentComponent.getStateValueAsObject().value,
      value: null,
    };

    if (!this.#childComponents.size) {
      return result;
    }

    for (const item of this.#childComponents.values()) {
      const itemValue = item.getStateValueAsObject().value;

      if (Array.isArray(result.value)) {
        result.value.push(itemValue);
      } else {
        result.value = itemValue;
      }
    }

    return result;
  }

  getComponentById(id) {
    if (this.#parentComponent.id === id) {
      return this.#parentComponent;
    }

    return this.#childComponents.get(id);
  }

  // -- Common -- //

  #isBlockNeeded() {
    if (this.#childComponents.size > 0) {
      return true;
    }

    return false;
  }

  get id() {
    return this.#parentComponent.id;
  }

  // refactor
  #blockAppendControl() {
    this.#parentComponent._setState({ blocked: true });
    this.#parentComponent.element.querySelector(
      '.input-item__button_append'
    ).disabled = true;
  }

  // refactor
  #unblockAppendControl() {
    this.#parentComponent._setState({ blocked: false });
    this.#parentComponent.element.querySelector(
      '.input-item__button_append'
    ).disabled = false;
  }

  destroy() {
    remove(this.#parentComponent);
    this.#parentComponent = null;
    this.#childComponents = new Map();
  }
}
