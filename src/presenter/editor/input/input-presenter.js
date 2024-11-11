import { render, remove } from '../../../framework/render.js';
import { generateRandomId } from '../../../util.js';
import ArrayItemView from '../../../view/editor/input/items/array-item-view.js';
import StringItemView from '../../../view/editor/input/items/string-item-view.js';
import ObjectItemView from '../../../view/editor/input/items/object-item-view.js';
import InputInitialView from '../../../view/editor/input/input-initial-view.js';

export default class InputPresenter {
  #container = null;
  #inputContentContainer = null;

  #inputItemComponents = new Map();

  #inputModel = null;

  constructor({ container, inputModel }) {
    this.#container = container;
    this.#inputModel = inputModel;
  }

  init() {
    this.#renderInitialInput(this.#container);
    this.#renderItemsFromModel(
      this.#inputModel.data,
      this.#inputContentContainer
    );
  }

  // --- Getter for components --- //
  get inputComponents() {
    return this.#inputItemComponents;
  }

  // --- Render functions --- //

  #renderInitialInput(container) {
    const inputContent = new InputInitialView({
      onItemButtonClick: this.#handleInputItemButtonClick,
      onItemInput: this.#handleItemInput,
    });
    this.#inputContentContainer = inputContent.childrenContainer;
    this.#inputItemComponents.set('0', inputContent);

    render(inputContent, container);
  }

  #renderItemsFromModel(items, container) {
    for (const [key, value] of Object.entries(items)) {
      const objectId = this.#renderObjectTypeItem(key, null, container);

      if (Array.isArray(value)) {
        this.#renderArrayItems(value, objectId);
      } else {
        this.#renderStringTypeItem(
          value,
          objectId,
          this.#inputItemComponents.get(objectId).childrenContainer
        );
      }
    }
  }

  #renderArrayItems(array, parentId) {
    const arrayId = this.#renderArrayTypeItem(
      parentId,
      this.#inputItemComponents.get(parentId).childrenContainer
    );

    for (const item of array) {
      if (typeof item === 'object') {
        this.#renderObjectItems(item, arrayId);
      }
    }
  }

  #renderObjectItems(object, parentId) {
    for (const [key, value] of Object.entries(object)) {
      const objectId = this.#renderObjectTypeItem(
        key,
        parentId,
        this.#inputItemComponents.get(parentId).childrenContainer
      );
      this.#renderStringTypeItem(
        value,
        objectId,
        this.#inputItemComponents.get(objectId).childrenContainer
      );
    }
  }

  #renderArrayTypeItem(parentId, container) {
    const arrayItem = new ArrayItemView({
      id: generateRandomId(),
      parentId: parentId,
    });
    this.#inputItemComponents.set(arrayItem.id, arrayItem);

    render(arrayItem, container);

    return arrayItem.id;
  }

  #renderObjectTypeItem(key, parentId, container) {
    const objectItem = new ObjectItemView({
      id: generateRandomId(),
      parentId: parentId,
      key: key,
    });
    this.#inputItemComponents.set(objectItem.id, objectItem);

    render(objectItem, container);

    return objectItem.id;
  }

  #renderStringTypeItem(value, parentId, container) {
    const stringItem = new StringItemView({
      id: generateRandomId(),
      parentId: parentId,
      value: value,
    });
    this.#inputItemComponents.set(stringItem.id, stringItem);

    render(stringItem, container);

    return stringItem.id;
  }

  // --- Handlers --- //

  #handleItemInput = (evt) => {
    const targetId = evt.target.closest('.input-item').dataset.id;
    const targetItem = this.#inputItemComponents.get(targetId);

    if (evt.target.classList.contains('input-item__field_key')) {
      targetItem._setState({ key: evt.target.value });
    } else if (evt.target.classList.contains('input-item__field_value')) {
      targetItem._setState({ value: evt.target.value });
    } else if (evt.target.classList.contains('input-item__value_type')) {
      targetItem._setState({ selectedType: evt.target.value });
    }
  };

  #handleInputItemButtonClick = (evt) => {
    const target = evt.target.closest('.input-item');

    if (target) {
      const targetId = target.dataset.id;

      if (evt.target.classList.contains('input-item__button_append')) {
        this.#handleAppendClick(targetId);
      } else if (evt.target.classList.contains('input-item__button_remove')) {
        this.#handleRemoveClick(targetId);
      }
    }
  };

  #handleAppendClick = (targetId) => {
    const targetComponent = this.#inputItemComponents.get(targetId);
    const targetChildrenContainer = targetComponent.childrenContainer;
    const selectedType = targetComponent._state.selectedType;

    if (selectedType === 'string') {
      this.#renderStringTypeItem('', targetId, targetChildrenContainer);
    } else if (selectedType === 'array') {
      this.#renderArrayTypeItem(targetId, targetChildrenContainer);
    } else {
      this.#renderObjectTypeItem('', targetId, targetChildrenContainer);
    }
  };

  #handleRemoveClick = (targetId) => {
    const targetItem = this.#inputItemComponents.get(targetId);

    remove(targetItem);
    this.#removeItemAndChildren(targetId);
  };

  // --- Common --- //

  #removeItemAndChildren(id) {
    const map = this.#inputItemComponents;

    function removeChildren(id) {
      const childrenToRemove = [];

      for (const [key, value] of map.entries()) {
        if (value._state.parentId === id) {
          childrenToRemove.push(key);
        }
      }

      for (const childId of childrenToRemove) {
        removeChildren(childId);
        map.delete(childId);
      }
    }

    if (map.has(id)) {
      removeChildren(id);
      map.delete(id);
    }
  }
}
