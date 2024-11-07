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

    this.#renderInputItemsListComponent('base', editorInputContainer);
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

  #renderInputItemsListComponent(parentId, container) {
    const inputItemsListComponent = new InputItemsListView({
      parentId: parentId,
      isNested: true,
    });
    this.#inputItemsListComponents.set(parentId, inputItemsListComponent);

    render(inputItemsListComponent, container);
  }

  // TODO: refactor this
  #renderOutputData() {
    const editorOutputContainer =
      this.#editorComponent.element.querySelector('#json-output');
    editorOutputContainer.textContent = this.#outputModel.data;
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

  // /**
  //  * Renders input items into the specified input items list component.
  //  *
  //  * @param {Object} items - The object containing input items to render.
  //  * @private
  //  */
  // #renderInputItems(items) {
  //   for (const item of Object.values(items)) {
  //     if (item.element.dataset.parentId === 'null') {
  //       render(item, this.#inputItemsListComponent.element);
  //     } else {
  //       const nestedList = new InputItemsListView({
  //         isNested: true,
  //         parentId: item.element.dataset.parentId,
  //       });

  //       this.#nestedLists[item.element.dataset.parentId] = nestedList;

  //       render(
  //         nestedList,
  //         this.#inputItems[item.element.dataset.parentId].element,
  //         RenderPosition.AFTEREND
  //       );
  //       render(item, nestedList.element);
  //     }
  //   }
  // }

  // /**
  //  * Handles the click event on input item buttons.
  //  *
  //  * @param {Event} evt - The click event.
  //  * @private
  //  */
  // #handleInputItemButtonClick = (evt) => {
  //   const target = evt.target.closest('li');

  //   if (target) {
  //     const targetId = target.dataset.id;

  //     if (evt.target.classList.contains('input-item__button_append')) {
  //       this.#handleAppendClick(targetId);
  //     } else if (evt.target.classList.contains('input-item__button_remove')) {
  //       this.#handleRemoveClick(targetId);
  //     }
  //   }
  // };

  // /**
  //  * Handles the append click event for adding new items to the input list.
  //  * @param {string} targetId - The ID of the target item to which a new item is being appended.
  //  * @returns {void}
  //  */
  // #handleAppendClick = (targetId) => {
  //   const newItem = this.#createNewItem(targetId);

  //   if (this.#nestedLists[targetId]) {
  //     if (this.#getListChildrenCount(targetId) < 3) {
  //       render(newItem, this.#nestedLists[targetId].element);
  //     }
  //   } else {
  //     const nestedList = this.#createNewList(targetId);

  //     render(
  //       nestedList,
  //       this.#inputItems[targetId].element,
  //       RenderPosition.AFTEREND
  //     );
  //     render(newItem, nestedList.element);

  //     this.#inputItems[targetId].updateElement({ inputValueDisabled: true });
  //   }
  // };

  // /**
  //  * Handles the remove click event for removing items from the input list.
  //  * @param {string} targetId - The ID of the target item to be removed.
  //  * @returns {void}
  //  */
  // #handleRemoveClick = (targetId) => {
  //   const targetItem = this.#inputItems[targetId];
  //   const targetItemParentId = targetItem.parentId;

  //   // TODO: show notification
  //   if (targetItemParentId === null) {
  //     return;
  //   }

  //   if (this.#nestedLists[targetId]) {
  //     this.#removeNestedList(targetId);
  //   }

  //   this.#removeItem(targetId);

  //   if (targetItemParentId !== null) {
  //     if (this.#getListChildrenCount(targetItemParentId) === 0) {
  //       this.#inputItems[targetItemParentId].updateElement({
  //         inputValueDisabled: false,
  //       });

  //       this.#removeNestedList(targetItemParentId);
  //     }
  //   }
  // };

  // /**
  //  * Handles input changes for the list items.
  //  * @param {Event} evt - The input event triggered by user interaction.
  //  * @returns {void}
  //  */
  // #handleItemInput = (evt) => {
  //   const targetId = evt.target.closest('li').dataset.id;
  //   const targetItem = this.#inputItems[targetId];

  //   if (evt.target.classList.contains('input-item__field_key')) {
  //     targetItem.updateElement({ key: evt.target.value });
  //   } else if (evt.target.classList.contains('input-item__field_value')) {
  //     targetItem.updateElement({ value: evt.target.value });
  //   }
  // };

  // /**
  //  * Creates a new input item.
  //  * @param {string} id - The ID of the parent item.
  //  * @returns {InputItemView} The newly created input item.
  //  */
  // #createNewItem(id) {
  //   const newItem = new InputItemView({
  //     id: generateRandomId(),
  //     key: '',
  //     value: '',
  //     parentId: id,
  //   });

  //   this.#inputItems[newItem.id] = newItem;

  //   return newItem;
  // }

  // /**
  //  * Creates a new nested list.
  //  * @param {string} id - The ID of the parent item to which the new list is associated.
  //  * @returns {InputItemsListView} The newly created nested list.
  //  */
  // #createNewList(id) {
  //   const newList = new InputItemsListView({
  //     isNested: true,
  //     parentId: id,
  //   });

  //   this.#nestedLists[id] = newList;

  //   return newList;
  // }

  // /**
  //  * Removes an item from the input items.
  //  * @param {string} id - The ID of the item to be removed.
  //  * @returns {void}
  //  */
  // #removeItem(id) {
  //   remove(this.#inputItems[id]);
  //   delete this.#inputItems[id];
  // }

  // /**
  //  * Removes a nested list from the nested lists.
  //  * @param {string} id - The ID of the nested list to be removed.
  //  * @returns {void}
  //  */
  // #removeNestedList(id) {
  //   remove(this.#nestedLists[id]);
  //   delete this.#nestedLists[id];
  // }

  // /**
  //  * Gets the number of children in a nested list.
  //  * @param {string} listId - The ID of the nested list to count children.
  //  * @returns {number} The number of child elements in the nested list.
  //  */
  // #getListChildrenCount(listId) {
  //   return this.#nestedLists[listId].element.children.length;
  // }
}
