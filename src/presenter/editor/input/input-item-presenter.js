import { render, remove } from '../../../framework/render.js';
import { generateRandomId } from '../../../util.js';
import ArrayItemView from '../../../view/editor/input/items/array-item-view.js';
import StringItemView from '../../../view/editor/input/items/string-item-view.js';
import ObjectItemView from '../../../view/editor/input/items/object-item-view.js';

export default class InputItemPresenter {
  #container = null;
  #parentComponent = null;
  #arrayComponent = null;
  #childComponents = new Map();

  constructor({ container }) {
    this.#container = container;
  }

  init(props) {
    this.#renderObjectTypeItem(this.#container, props);
  }

  // -- Render methods -- //

  #renderObjectTypeItem(container, props) {
    const itemProps = {id: generateRandomId(), ...props}

    this.#parentComponent = new ObjectItemView({ ...itemProps });

    render(this.#parentComponent, container);
  }

  // -- Child methods -- //

  updateItemState(targetId, value) {
    const targetComponent = this.getComponentById(targetId);

    targetComponent._setState(value);
  }

  appendArrayItemPart() {
    const arrayTypeItem = new ArrayItemView({
      id: generateRandomId(),
      parentId: this.#parentComponent.id,
      rootObjId: this.#parentComponent.id,
    });

    this.#arrayComponent = arrayTypeItem;

    render(arrayTypeItem, this.#parentComponent.childrenContainer);

    if (this.#isBlockNeeded()) {
      this.#blockAppendControl();
    }

    return arrayTypeItem.id;
  }

  appendStringItemPart(props) {
    let container;
    const itemProps = {id: generateRandomId(), rootObjId: this.#parentComponent.id, ...props}

    if (this.#arrayComponent !== null) {
      itemProps.parentId = this.#arrayComponent.id;
      container = this.#arrayComponent.childrenContainer;
    } else {
      itemProps.parentId = this.#parentComponent.id;
      container = this.#parentComponent.childrenContainer;
    }

    const stringTypeItem = new StringItemView({ ...itemProps });
    this.#childComponents.set(stringTypeItem.id, stringTypeItem);

    render(stringTypeItem, container);

    if (this.#isBlockNeeded()) {
      this.#blockAppendControl();
    }
  }

  // refactor: childs components also should be erased from childComponents
  removeItemPart(targetId) {
    const targetComponent = this.getComponentById(targetId);

    if (targetComponent === this.#arrayComponent) {
      remove(targetComponent);
      this.#arrayComponent = null;
      this.#removeChildren(targetId);


    } else {
      remove(targetComponent);
      this.#childComponents.delete(targetId);
      // this.#removeItemAndChildren(targetId);
    }

    console.log(this.#childComponents)

    if (!this.#isBlockNeeded()) {
      this.#unblockAppendControl();
    }
  }

  // -- Getters -- //

  // rewrite logic
  getItemAsObject() {
    let result = this.#arrayComponent !== null ? [] : null;

    for (const item of this.#childComponents.values()) {
      const itemContent = item._state.value;

        if (Array.isArray(result)) {
          result.push(itemContent);
        } else {
          result = itemContent;
        }
    }

    return {  parentId: this.#parentComponent._state.parentId, arrId: this.#arrayComponent?.id, key: this.#parentComponent._state.key, value: result };
  }

  getComponentById(id) {
    if (this.#parentComponent.id === id) {
      return this.#parentComponent;
    } else if (this.#arrayComponent?.id === id) {
      return this.#arrayComponent;
    }

    return this.#childComponents.get(id);
  }

  // -- Common -- //

  #isBlockNeeded() {
    if (this.#childComponents.size > 0 || this.#arrayComponent !== null) {
      return true;
    }

    return false;
  }

  get id() {
    return this.#parentComponent.id;
  }

  get component() {
    return this.#parentComponent;
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

  #removeChildren(id) {
    const map = this.#childComponents;
    const childrenToRemove = [...map.entries()].filter(([_, value]) => value._state.parentId === id).map(([key]) => key);

    for (const childId of childrenToRemove) {
      this.#removeChildren(childId);
      map.delete(childId);
    }
  };

  destroy() {
    remove(this.#parentComponent);
    this.#parentComponent = null;
    this.#childComponents = new Map();
  }
}
