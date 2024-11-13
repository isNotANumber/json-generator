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

  init(props) {
    this.#renderObjectTypeItem(this.#container, props);
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

  registerChildObjectItem(item) {
    this.#childComponents.set(item.id, item);
    
    console.log(this.getItemAsObject());
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

    console.log(this.getItemAsObject());
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

    console.log(this.getItemAsObject());
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
    let result = null;

    for (const item of this.#childComponents.values()) {

        if (item instanceof ArrayItemView) {
            result = [];
        } else if (item instanceof StringItemView) {
            const itemContent = item._state.value;

            if (Array.isArray(result)) {
                result.push(itemContent);
            } else {
                result = itemContent;
            }
        } else if (item instanceof ObjectItemView) {
            const itemContent = {key: item._state.key, value: null};

            if (Array.isArray(result)) {
                result.push(itemContent);
            } else {
                result = itemContent;
            }
        }
    }

    return {key: this.#parentComponent._state.key, value: result}
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

  destroy() {
    remove(this.#parentComponent);
    this.#parentComponent = null;
    this.#childComponents = new Map();
  }
}
