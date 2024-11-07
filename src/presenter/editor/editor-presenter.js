import { render, remove, RenderPosition } from '../../framework/render';
import EditorView from '../../view/editor/editor-view';
import { generateRandomId } from '../../util.js';
import InputItemView from '../../view/editor/input/input-item-view.js';
import InputItemsListView from '../../view/editor/input/input-items-list-view.js';

export default class EditorPresenter {
  #container = null;

  #editorComponent = null;

  #inputItemComponents = new Map();
  #inputItemsListComponents = new Map();

  #inputModel = null;
  #outputModel = null;

  constructor({ container, inputModel, outputModel }) {
    this.#container = container;
    this.#inputModel = inputModel;
    this.#outputModel = outputModel;
  }

  init() {
    this.#renderEditor(this.#container);

    const editorInputContainer = this.#editorComponent.element.querySelector(
      '.editor__pane_input'
    );

    this.#renderInputItemsListComponent('base', editorInputContainer, false);
    this.#renderComponentsFromData(
      this.#inputModel.data,
      this.#inputItemsListComponents.get('base').element
    );
  }

  #renderEditor(container) {
    this.#editorComponent = new EditorView();

    render(this.#editorComponent, container);
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

  // TODO: refactor this
  #renderOutputData() {
    const editorOutputContainer =
      this.#editorComponent.element.querySelector('#json-output');
    editorOutputContainer.textContent = this.#outputModel.data;
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
    // const targetItemParentId = targetItem.element.dataset.parentId;
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

  reset() {
    this.#inputModel.setDefaultData();
    this.#outputModel.setDefaultData();
    remove(this.#editorComponent);
    this.init();
  }

  apply() {
    const data = this.#inputModel.data;
    this.#outputModel.data = data;

    this.#renderOutputData();
  }
}
