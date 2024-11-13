import { render, remove } from '../../../framework/render.js';
// import { generateRandomId } from '../../../util.js';
// import ArrayItemView from '../../../view/editor/input/items/array-item-view.js';
// import StringItemView from '../../../view/editor/input/items/string-item-view.js';
// import ObjectItemView from '../../../view/editor/input/items/object-item-view.js';
import InputInitialView from '../../../view/editor/input/input-initial-view.js';
import InputItemPresenter from './input-item-presenter.js';

export default class InputPresenter {
  #container;
  #initialComponent = null;
  #inputItemComponents = new Map();
  #inputModel;

  constructor({ container, inputModel }) {
    this.#container = container;
    this.#inputModel = inputModel;
  }

  init() {
    this.#renderInitialInput();
  }

  // get inputComponents() {
  //   return this.#inputItemComponents;
  // }

  #renderInitialInput() {
    const inputContent = new InputInitialView({
      onControlClick: this.#handleInputItemButtonClick,
      onItemFieldChange: this.#handleItemFieldChange,
    });

    this.#initialComponent = inputContent;
    render(inputContent, this.#container);

    this.#initiateItemPresenter(this.#initialComponent.childrenContainer);
  }

  #initiateItemPresenter(container, props) {
    const objectItem = new InputItemPresenter({
      container: container,
      props: props
    });

    objectItem.init();

    this.#inputItemComponents.set(objectItem.id, objectItem);
  }

  #handleInputItemButtonClick = (evt) => {
    const targetElement = evt.target.closest('.input-item');

    if (targetElement) {
      if (evt.target.classList.contains('input-item__button_append')) {

        if (targetElement.classList.contains('input-item__initial')) {
          this.#initiateItemPresenter(this.#initialComponent.childrenContainer);
          return;
        }

        this.#handleAppendClick(targetElement);

      } else if (evt.target.classList.contains('input-item__button_remove')) {
        this.#handleRemoveClick(targetElement);
      }
    }
  };

  #handleAppendClick(target) {
    const targetId = target.dataset.id;
    const presenterId = target.dataset.rootObjId;

    const targetPresenter = this.#inputItemComponents.get(presenterId);

    const targetComponent = targetPresenter.getComponentById(targetId);

    const selectedType = targetComponent._state.selectedType;

    if (selectedType === 'string') {
      targetPresenter.appendStringItemPart(targetId);
    } else if (selectedType === 'array') {
      targetPresenter.appendArrayItemPart(targetId);
    } else {
      // this.#renderObjectTypeItem('', targetId, targetChildrenContainer);
    }
  }

  #handleRemoveClick(target) {
    const targetId = target.dataset.id;
    const presenterId = target.dataset.rootObjId;

    const targetPresenter = this.#inputItemComponents.get(presenterId);

    if (presenterId === targetId) {
      targetPresenter.destroy();
      this.#inputItemComponents.delete(targetId);

      return;
    }

    targetPresenter.removeItemPart(targetId);
  }

  #handleItemFieldChange = (evt) => {
    const target = evt.target.closest('.input-item');
    const targetId = target.dataset.id;
    const presenterId = target.dataset.rootObjId;
    const fieldClass = evt.target.classList;

    const targetPresenter = this.#inputItemComponents.get(presenterId);

    if (fieldClass.contains('input-item__field_key')) {
      targetPresenter.updateItemState(targetId, { key: evt.target.value });
    } else if (fieldClass.contains('input-item__field_value')) {
      targetPresenter.updateItemState(targetId, { value: evt.target.value });
    } else if (fieldClass.contains('input-item__value_type')) {
      targetPresenter.updateItemState(targetId, {
        selectedType: evt.target.value,
      });
    }
  };

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
