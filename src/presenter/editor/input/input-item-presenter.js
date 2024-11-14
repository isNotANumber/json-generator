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

  /**
   * Renders an object type item in the given container.
   * @param {HTMLElement} container - The container to render the item in.
   * @param {Object} props - Properties of the object item.
   * @private
   */
  #renderObjectTypeItem(container, props) {
    const itemProps = { id: generateRandomId(), ...props };

    this.#parentComponent = new ObjectItemView({ ...itemProps });

    render(this.#parentComponent, container);
  }

  // -- Child methods -- //

  /**
   * Appends an array item part and renders it.
   * @returns {string} The ID of the appended array item.
   */
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

  /**
   * Appends a string item part with given properties.
   * @param {Object} props - Properties for the string item.
   */
  appendStringItemPart(props) {
    let container;
    const itemProps = {
      id: generateRandomId(),
      rootObjId: this.#parentComponent.id,
      ...props,
    };

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

  /**
   * Removes an item part by its target ID.
   * @param {string} targetId - The ID of the target item to remove.
   */
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

    if (!this.#isBlockNeeded()) {
      this.#unblockAppendControl();
    }
  }

  /**
   * Recursively removes children of the specified ID.
   * @param {string} id - The ID of the parent item whose children need to be removed.
   * @private
   */
  #removeChildren(id) {
    const map = this.#childComponents;
    const childrenToRemove = [...map.entries()]
      .filter(([_, value]) => value._state.parentId === id)
      .map(([key]) => key);

    for (const childId of childrenToRemove) {
      this.#removeChildren(childId);
      map.delete(childId);
    }
  }

  // -- Getters -- //

  /**
   * Gets the item as an object representation.
   * @returns {Object} The object representation of the item.
   */
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

    return {
      parentId: this.#parentComponent._state.parentId,
      arrId: this.#arrayComponent?.id,
      key: this.#parentComponent._state.key,
      value: result,
    };
  }

  /**
   * Retrieves a component by its ID.
   * @param {string} id - The ID of the component to retrieve.
   * @returns {Object|null} The component if found, otherwise null.
   */
  getComponentById(id) {
    if (this.#parentComponent.id === id) {
      return this.#parentComponent;
    } else if (this.#arrayComponent?.id === id) {
      return this.#arrayComponent;
    }

    return this.#childComponents.get(id);
  }

  /**
   * Gets the ID of the parent component.
   * @returns {string} The ID of the parent component.
   */
  get id() {
    return this.#parentComponent.id;
  }

  /**
   * Gets the parent component.
   * @returns {Object} The parent component.
   */
  get component() {
    return this.#parentComponent;
  }

  // -- Common -- //

  /**
   * Updates the state of a target item.
   * @param {string} targetId - The ID of the target item to update.
   * @param {Object} value - The new state value for the target item.
   */
  updateItemState(targetId, value) {
    const targetComponent = this.getComponentById(targetId);

    targetComponent._setState(value);
  }

  /**
   * Blocks the append control and type selector for the parent component.
   * @private
   */
  #blockAppendControl() {
    this.#parentComponent.updateElement({ blocked: true });
  }

  /**
   * Unblocks the append control and type selector for the parent component.
   * @private
   */
  #unblockAppendControl() {
    this.#parentComponent.updateElement({ blocked: false });
  }

  /**
   * Destroys the presenter and cleans up resources.
   */
  destroy() {
    remove(this.#parentComponent);
    this.#parentComponent = null;
    this.#childComponents = new Map();
  }

  // -- Checkers -- //

  /**
   * Checks if blocking is needed based on the current state.
   * @returns {boolean} True if blocking is needed, otherwise false.
   * @private
   */
  #isBlockNeeded() {
    if (this.#childComponents.size > 0 || this.#arrayComponent !== null) {
      return true;
    }

    return false;
  }
}
