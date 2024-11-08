import { render, remove, RenderPosition } from '../../../framework/render.js';
import { generateRandomId } from '../../../util.js';
import InputItemView from '../../../view/editor/input/input-item-view.js';
import InputItemsListView from '../../../view/editor/input/input-items-list-view.js';
import Adapter from '../../../framework/adapter/adapter.js'

export default class InputItemsListPresenter {
  #container = null;

  #inputItemComponents = new Map();
  #inputItemsListComponents = new Map();

  #inputModel = null;

  constructor({ container, inputModel }) {
    this.#container = container;
    this.#inputModel = inputModel;
  }

  init() {
    this.#renderInputItemsListComponent('base', this.#container, false);
    this.#renderComponentsFromData(
      this.#inputModel.data,
      this.#inputItemsListComponents.get('base').element
    );
  }

  get inputItems() {
    return Adapter.convertInputItemsToModel(this.#inputItemComponents);
  }

  #renderComponentsFromData(data, container, parentId = null) {
    data.forEach((item) => {
      this.#renderInputItemComponent(item, parentId, container);

      if (Array.isArray(item.value)) {
        this.#renderInputItemsListComponent(item.id, container);

        this.#renderComponentsFromData(
          item.value,
          this.#inputItemsListComponents.get(item.id).element,
          item.id
        );
      }
    });
  }

  #renderInputItemComponent(item, parentId, container) {
    const inputItemComponent = new InputItemView({
      item: item,
      parentId: parentId,
    });
    this.#inputItemComponents.set(item.id, inputItemComponent);

    render(inputItemComponent, container);
  }

  #renderInputItemsListComponent(
    parentId,
    container,
    isNested = true,
    renderPosition = RenderPosition.BEFOREEND
  ) {
    const inputItemsListComponent = new InputItemsListView({
      onItemButtonClick: this.#handleInputItemButtonClick,
      onItemInput: this.#handleItemInput,
      parentId: parentId,
      isNested: isNested,
    });
    this.#inputItemsListComponents.set(parentId, inputItemsListComponent);

    render(inputItemsListComponent, container, renderPosition);
  }

  #handleInputItemButtonClick = (evt) => {
    const target = evt.target.closest('li');

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
    const targetItem = this.#inputItemComponents.get(targetId);
    const targetItemsList = this.#inputItemsListComponents.get(targetId);

    const newItem = { id: generateRandomId(), key: '', value: '' };

    if (targetItemsList) {
      if (this.#getListChildrenCount(targetItemsList) < 3) {
        this.#renderInputItemComponent(
          newItem,
          targetId,
          targetItemsList.element
        );
      }
    } else {
      this.#renderInputItemsListComponent(
        targetId,
        targetItem.element,
        true,
        RenderPosition.AFTEREND
      );
      const nestedList = this.#inputItemsListComponents.get(targetId);

      this.#renderInputItemComponent(newItem, targetId, nestedList.element);

      targetItem.updateElement({ inputValueDisabled: true });
    }
  };

  #handleRemoveClick = (targetId) => {
    const targetItem = this.#inputItemComponents.get(targetId);
    const targetItemParentId = targetItem.parentId;

    const targetItemsChildsList = this.#inputItemsListComponents.get(targetId);
    const targetItemsParentList =
      this.#inputItemsListComponents.get(targetItemParentId);

    // TODO: show notification
    if (targetItemParentId === null) {
      return;
    }

    if (targetItemsChildsList) {
      this.#removeNestedList(targetId);
    }
    this.#removeItem(targetId);

    if (targetItemParentId !== null) {
      if (this.#getListChildrenCount(targetItemsParentList) === 0) {
        this.#inputItemComponents.get(targetItemParentId).updateElement({
          inputValueDisabled: false,
        });

        this.#removeNestedList(targetItemParentId);
      }
    }
  };

  #handleItemInput = (evt) => {
    const targetId = evt.target.closest('li').dataset.id;
    const targetItem = this.#inputItemComponents.get(targetId);

    if (evt.target.classList.contains('input-item__field_key')) {
      targetItem.updateElement({ key: evt.target.value });
    } else if (evt.target.classList.contains('input-item__field_value')) {
      targetItem.updateElement({ value: evt.target.value });
    }
  };

  #removeNestedList(id) {
    remove(this.#inputItemsListComponents.get(id));
    this.#inputItemsListComponents.delete(id);
  }

  #removeItem(id) {
    remove(this.#inputItemComponents.get(id));
    this.#inputItemComponents.delete(id);
  }

  #getListChildrenCount(itemsList) {
    return itemsList.element.children.length;
  }
}
