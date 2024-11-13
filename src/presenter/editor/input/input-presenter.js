import { render } from '../../../framework/render.js';
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

  get dataAsObj() {
    return this.#convertComponentsToObj(this.#inputItemComponents);
  }

  #renderInitialInput() {
    const inputContent = new InputInitialView({
      onControlClick: this.#handleInputItemButtonClick,
      onItemFieldChange: this.#handleItemFieldChange,
    });

    this.#initialComponent = inputContent;
    render(inputContent, this.#container);

    // this.#renderItemsFromModel(this.#inputModel.data);
    this.#initiateItemPresenter(this.#initialComponent.childrenContainer);
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
      targetPresenter.appendStringItemPart();
    } else if (selectedType === 'array') {
      targetPresenter.appendArrayItemPart();
    } else {
      this.#initiateItemPresenter(targetComponent.childrenContainer, {
        parentId: targetId,
      });
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
      const newPresenter = this.#initiateItemPresenter(
        this.#initialComponent.childrenContainer,
        { key: key }
      );
      const itemProps = { value: value };

      if (Array.isArray(value)) {
        this.#renderArrayItems(value, newPresenter);
      } else {
        newPresenter.appendStringItemPart(itemProps);
      }
    }
  }

  #renderArrayItems(array, presenter) {
    const arrayId = presenter.appendArrayItemPart();

    for (const item of array) {
      if (typeof item === 'object') {
        this.#renderObjectItems(item, presenter, arrayId);
      } else {
        const itemProps = { value: item };

        presenter.appendStringItemPart(itemProps);
      }
    }
  }

  #renderObjectItems(object, presenter, parentId) {
    const targetComponent = presenter.getComponentById(parentId);

    for (const [key, value] of Object.entries(object)) {
      const newPresenter = this.#initiateItemPresenter(
        targetComponent.childrenContainer,
        { key: key, parentId: parentId }
      );

      const presenterId = newPresenter.component._state.id;

      const itemProps = { value: value };
      newPresenter.appendStringItemPart(itemProps);
    }
  }

  // Cannot convert nested objects inside of arr
  #convertComponentsToObj() {
    const result = {};

    for (const item of this.#inputItemComponents.values()) {
      const itemObj = item.getItemAsObject();

      result[itemObj.key] = itemObj.value;
    }

    return result;
  }

  // #test() {
  //   const result = [];

  //   for (const item of this.#inputItemComponents.values()) {
  //     const itemObj = item.getItemAsObject();

  //     result.push(itemObj);
  //   }

  //   console.log(result);
  // }
}
