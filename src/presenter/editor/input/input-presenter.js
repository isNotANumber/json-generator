import { render } from '../../../framework/render.js';
import InputInitialView from '../../../view/editor/input/input-initial-view.js';
import InputItemPresenter from './input-item-presenter.js';

export default class InputPresenter {
  #container;
  #initialComponent = null;
  #inputItemPresenters = new Map();
  #inputModel = null;

  constructor({ container, inputModel }) {
    this.#container = container;
    this.#inputModel = inputModel;
  }

  init() {
    this.#renderInitialInput();
  }

  /**
   * Gets the data represented by the input presenters as an object.
   * @returns {Object} The data as an object.
   */
  get dataAsObj() {
    return this.#convertPresentersToObj(this.#inputItemPresenters);
  }

  /**
   * Renders the initial input view component.
   * @private
   */
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

  /**
   * Initiates an InputItemPresenter for managing input items.
   * @param {HTMLElement} container - The container for the item presenter.
   * @param {Object} [props] - Additional properties for initialization.
   * @returns {InputItemPresenter} The created InputItemPresenter instance.
   * @private
   */
  #initiateItemPresenter(container, props) {
    const objectItem = new InputItemPresenter({
      container: container,
    });

    objectItem.init(props);

    this.#inputItemPresenters.set(objectItem.id, objectItem);

    return objectItem;
  }

  /**
   * Handles click events on input item buttons.
   * @param {Event} evt - The click event.
   * @private
   */
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

  /**
   * Handles appending new input items based on the selected type.
   * @param {HTMLElement} target - The target input item element.
   * @private
   */
  #handleAppendClick(target) {
    const targetId = target.dataset.id;
    const presenterId = target.dataset.rootObjId;
    const targetPresenter = this.#inputItemPresenters.get(presenterId);
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

  /**
   * Handles removing input items.
   * @param {HTMLElement} target - The target input item element to be removed.
   * @private
   */
  #handleRemoveClick(target) {
    const targetId = target.dataset.id;
    const presenterId = target.dataset.rootObjId;

    const targetPresenter = this.#inputItemPresenters.get(presenterId);

    if (presenterId === targetId) {
      targetPresenter.destroy();
      this.#inputItemPresenters.delete(targetId);

      return;
    }

    targetPresenter.removeItemPart(targetId);
  }

  /**
   * Handles changes to input item fields.
   * @param {Event} evt - The change event.
   * @private
   */
  #handleItemFieldChange = (evt) => {
    const target = evt.target.closest('.input-item');
    const targetId = target.dataset.id;
    const presenterId = target.dataset.rootObjId;
    const fieldClass = evt.target.classList;

    const targetPresenter = this.#inputItemPresenters.get(presenterId);

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

  /**
   * Renders items from the input model.
   * @param {Object} items - The items to render.
   * @private
   */
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

  /**
   * Renders an array of items.
   * @param {Array} array - The array of items to render.
   * @param {InputItemPresenter} presenter - The presenter for the array items.
   * @private
   */
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

  /**
   * Renders object items within a parent presenter.
   * @param {Object} object - The object containing items to render.
   * @param {InputItemPresenter} presenter - The presenter for the object items.
   * @param {string} parentId - The ID of the parent item.
   * @private
   */
  #renderObjectItems(object, presenter, parentId) {
    const targetComponent = presenter.getComponentById(parentId);

    for (const [key, value] of Object.entries(object)) {
      const newPresenter = this.#initiateItemPresenter(
        targetComponent.childrenContainer,
        { key: key, parentId: parentId }
      );

      const itemProps = { value: value };
      newPresenter.appendStringItemPart(itemProps);
    }
  }

  /**
   * Converts the input item presenters to an object representation.
   * @returns {Object} The object representation of the input items.
   * @private
   */
  #convertPresentersToObj() {
    const result = {};
    let arrId = null;
    let arrKey = null;

    for (const item of this.#inputItemPresenters.values()) {
      const itemObj = item.getItemAsObject();

      if (itemObj.arrId && itemObj.value.length === 0) {
        arrId = itemObj.arrId;
        arrKey = itemObj.key;
        result[itemObj.key] = [];

        continue;
      }

      if (arrId != null && itemObj.parentId === arrId) {
        result[arrKey].push({ [itemObj.key]: itemObj.value });
      } else {
        arrId = null;
        arrKey = null;
        result[itemObj.key] = itemObj.value;
      }
    }

    return result;
  }
}
