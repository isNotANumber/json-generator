import { render, remove } from '../../../framework/render.js';
import { generateRandomId } from '../../../util.js';
import ArrayItemView from '../../../view/editor/input/items/array-item-view.js';
import StringItemView from '../../../view/editor/input/items/string-item-view.js';
import ObjectItemView from '../../../view/editor/input/items/object-item-view.js';
import InputInitialView from '../../../view/editor/input/input-initial-view.js';
import InputItemPresenter from './input-item-presenter.js';

export default class InputPresenter {
  #container;
  #inputItemComponents = new Map();
  #inputModel;

  constructor({ container, inputModel }) {
    this.#container = container;
    this.#inputModel = inputModel;
  }

  init() {
    this.#renderInitialInput();

    const test = new InputItemPresenter({container: this.#inputItemComponents.get('root').childrenContainer});
    test.init()
    this.#inputItemComponents.set(test.id, test);

    console.log(this.#inputItemComponents)

    // this.#renderItemsFromModel(this.#inputModel.data);
  }

  // get inputComponents() {
  //   return this.#inputItemComponents;
  // }

  #renderInitialInput() {
    const inputContent = new InputInitialView({
      onItemButtonClick: this.#handleInputItemButtonClick,
      // onItemInput: this.#handleItemInput,
    });
    this.#inputItemComponents.set('root', inputContent);
    render(inputContent, this.#container);
  }

  #handleInputItemButtonClick = (evt) => {
    const target = evt.target.closest('.input-item');

    if (target) {
      const targetId = target.dataset.id;
      if (evt.target.classList.contains('input-item__button_append')) {
        this.#handleAppendClick(target);
      } else if (evt.target.classList.contains('input-item__button_remove')) {
        // this.#handleRemoveClick(targetId);
      }
    }
  };

  #handleAppendClick(target) {
    const targetId = target.dataset.id;
    const presenterId = target.dataset.rootId;
    // const targetParentId = target.dataset.parentId;

    const targetPresenter = this.#inputItemComponents.get(targetId) ? 
    this.#inputItemComponents.get(targetId) : 
    this.#inputItemComponents.get(presenterId);

    const targetComponent = targetPresenter.getComponentById(targetId);
    console.log(targetComponent)

    const selectedType = targetComponent._state.selectedType;
    console.log(selectedType)
    const targetChildrenContainer = targetComponent.childrenContainer;
    console.log(targetChildrenContainer)

    if (selectedType === 'string') {
      // targetPresenter.appendStringItemPart()
      // this.#renderStringTypeItem('', targetId, targetChildrenContainer);
    } else if (selectedType === 'array') {
      targetPresenter.appendArrayItemPart(targetId);
      // this.#renderArrayTypeItem(targetId, targetChildrenContainer);
    } else {
      // this.#renderObjectTypeItem('', targetId, targetChildrenContainer);
    }
  }

  // #handleRemoveClick(targetId) {
  //   const targetItem = this.#inputItemComponents.get(targetId);
  //   remove(targetItem);
  //   this.#removeItemAndChildren(targetId);
  // }

  // #renderItemsFromModel(items) {
  //   for (const [key, value] of Object.entries(items)) {
  //     const objectId = this.#renderObjectTypeItem(key, '0');

  //     if (Array.isArray(value)) {
  //       this.#renderArrayItems(value, objectId);
  //     } else {
  //       this.#renderStringTypeItem(value, objectId);
  //     }
  //   }
  // }

  // #renderArrayItems(array, parentId) {
  //   const arrayId = this.#renderArrayTypeItem(parentId);

  //   for (const item of array) {
  //     if (typeof item === 'object') {
  //       this.#renderObjectItems(item, arrayId);
  //     } else {
  //       this.#renderStringTypeItem(item, arrayId);
  //     }
  //   }
  // }

  // #renderObjectItems(object, parentId) {
  //   for (const [key, value] of Object.entries(object)) {
  //     const objectId = this.#renderObjectTypeItem(key, parentId);
  //     this.#renderStringTypeItem(value, objectId);
  //     this.#inputItemComponents.get(parentId)._state.value.push({ key, value });
  //   }
  // }

  // #renderArrayTypeItem(parentId) {
  //   const arrayItem = new ArrayItemView({ id: generateRandomId(), parentId });
  //   this.#inputItemComponents.set(arrayItem.id, arrayItem);
  //   this.#inputItemComponents.get(parentId)._state.value = arrayItem._state.value;
  //   render(arrayItem, this.#inputItemComponents.get(parentId).childrenContainer);
  //   return arrayItem.id;
  // }

  // #renderObjectTypeItem(key, parentId) {
  //   const objectItem = new ObjectItemView({ id: generateRandomId(), parentId, key });
  //   this.#inputItemComponents.set(objectItem.id, objectItem);
  //   render(objectItem, this.#inputItemComponents.get(parentId).childrenContainer);
  //   return objectItem.id;
  // }

  // #renderStringTypeItem(value, parentId) {
  //   const stringItem = new StringItemView({ id: generateRandomId(), parentId, value });
  //   this.#inputItemComponents.set(stringItem.id, stringItem);
  //   const parentItem = this.#inputItemComponents.get(parentId);
  //   parentItem._state.value = Array.isArray(parentItem._state.value) ? [...parentItem._state.value, value] : value;
  //   render(stringItem, parentItem.childrenContainer);
  //   return stringItem.id;
  // }

  // #handleItemInput = (evt) => {
  //   const targetId = evt.target.closest('.input-item').dataset.id;
  //   const targetItem = this.#inputItemComponents.get(targetId);
  //   const fieldClass = evt.target.classList;

  //   if (fieldClass.contains('input-item__field_key')) {
  //     targetItem._setState({ key: evt.target.value });
  //   } else if (fieldClass.contains('input-item__field_value')) {
  //     targetItem._setState({ value: evt.target.value });
  //   } else if (fieldClass.contains('input-item__value_type')) {
  //     targetItem._setState({ selectedType: evt.target.value });
  //   }
  // };

  // #handleInputItemButtonClick = (evt) => {
  //   const target = evt.target.closest('.input-item');

  //   if (target) {
  //     const targetId = target.dataset.id;
  //     if (evt.target.classList.contains('input-item__button_append')) {
  //       this.#handleAppendClick(targetId);
  //     } else if (evt.target.classList.contains('input-item__button_remove')) {
  //       this.#handleRemoveClick(targetId);
  //     }
  //   }
  // };

  // #handleAppendClick(targetId) {
  //   const targetComponent = this.#inputItemComponents.get(targetId);
  //   const selectedType = targetComponent._state.selectedType;
  //   const targetChildrenContainer = targetComponent.childrenContainer;

  //   if (selectedType === 'string') {
  //     this.#renderStringTypeItem('', targetId, targetChildrenContainer);
  //   } else if (selectedType === 'array') {
  //     this.#renderArrayTypeItem(targetId, targetChildrenContainer);
  //   } else {
  //     this.#renderObjectTypeItem('', targetId, targetChildrenContainer);
  //   }
  // }

  // #handleRemoveClick(targetId) {
  //   const targetItem = this.#inputItemComponents.get(targetId);
  //   remove(targetItem);
  //   this.#removeItemAndChildren(targetId);
  // }

  // #removeItemAndChildren(id) {
  //   const map = this.#inputItemComponents;

  //   const removeChildren = (id) => {
  //     const childrenToRemove = [...map.entries()].filter(([_, value]) => value._state.parentId === id).map(([key]) => key);
  //     for (const childId of childrenToRemove) {
  //       removeChildren(childId);
  //       map.delete(childId);
  //     }
  //   };

  //   if (map.has(id)) {
  //     removeChildren(id);
  //     map.delete(id);
  //   }
  // }
}