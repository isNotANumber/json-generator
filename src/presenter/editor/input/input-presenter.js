import { render, remove } from '../../../framework/render.js';
import { generateRandomId } from '../../../util.js';
// import ArrayItemView from '../../../view/editor/input/items/array-item-view.js';
// import StringItemView from '../../../view/editor/input/items/string-item-view.js';
// import ObjectItemView from '../../../view/editor/input/items/object-item-view.js';
import InputInitialView from '../../../view/editor/input/input-initial-view.js';
import InputItemPresenter from './input-item-presenter.js';

export default class InputPresenter {
  #container;
  #initialComponent = null;
  #inputItemComponents = new Map();
  #inputModel = null;

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

    this.#renderItemsFromModel(this.#inputModel.data)
    // this.#initiateItemPresenter(this.#initialComponent.childrenContainer);
  }

  #initiateItemPresenter(container, props) {
    const objectItem = new InputItemPresenter({
      container: container,
    });

    objectItem.init(props);

    this.#inputItemComponents.set(objectItem.id, objectItem);

    return objectItem;
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
      const newItem = this.#initiateItemPresenter(targetComponent.childrenContainer, {id: generateRandomId(), parentId: targetId}).component;
      targetPresenter.registerChildObjectItem(newItem);
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

  #renderItemsFromModel(items) {
    for (const [key, value] of Object.entries(items)) {
      const newPresenter = this.#initiateItemPresenter(this.#initialComponent.childrenContainer, {id: generateRandomId(), key: key});
      const presenterId = newPresenter.component._state.id;
      const props = {id: generateRandomId(), parentId: presenterId, value: value};

      if (Array.isArray(value)) {
        this.#renderArrayItems(value, newPresenter)
      } else {
        newPresenter.appendStringItemPart(presenterId, props)
      }


    }
  }

  #renderArrayItems(array, presenter) {
    const presenterId = presenter.component._state.id;

    const arrayId = presenter.appendArrayItemPart(presenterId)

    for (const item of array) {
      if (typeof item === 'object') {
          this.#renderObjectItems(item, presenter, arrayId)
      } else {
        const props = {id: generateRandomId(), parentId: presenterId, value: item};

        presenter.appendStringItemPart(arrayId, props)
      }
    }
  }

  #renderObjectItems(object, presenter, parentId) {
    const targetComponent = presenter.getComponentById(parentId);

    for (const [key, value] of Object.entries(object)) {
      const newPresenter = this.#initiateItemPresenter(targetComponent.childrenContainer, {id: generateRandomId(), key: key});
      presenter.registerChildObjectItem(newPresenter);

      const presenterId = newPresenter.component._state.id;

      const props = {id: generateRandomId(), parentId: presenterId, value: value};

      newPresenter.appendStringItemPart(presenterId, props);
    }
  }

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
