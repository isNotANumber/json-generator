import { render, remove, RenderPosition } from '../../framework/render';
import EditorView from '../../view/editor/editor-view';
import { generateRandomId } from '../../util.js';
// import Adapter from '../../framework/view/adapter/adapter.js';
import InputItemView from '../../view/editor/input/input-item-view.js';
import InputItemsListView from '../../view/editor/input/input-items-list-view.js';

export default class EditorPresenter {
  /**
   * @private
   * @type {HTMLElement|null}
   */
  #container = null;

  /**
   * @private
   * @type {EditorView|null}
   */
  #editorComponent = null;

  /**
   * @private
   * @type {InputItemsListView|null}
   */
  #baseInputItemsList = null;

  /**
   * @private
   * @type {EditorInputModel|null}
   */
  #inputModel = null;

  /**
   * @private
   * @type {EditorOutputModel|null}
   */
  #outputModel = null;

  /**
   * Initializes an instance of the EditorPresenter.
   *
   * @param {Object} params - The parameters for initializing the presenter.
   * @param {HTMLElement} params.container - The container element for the editor.
   * @param {EditorInputModel} params.inputModel - The model managing input data.
   * @param {EditorOutputModel} params.outputModel - The model managing output data.
   */
  constructor({ container, inputModel, outputModel }) {
    this.#container = container;
    this.#inputModel = inputModel;
    this.#outputModel = outputModel;
  }

  /**
   * Initializes the editor presenter and renders the editor component.
   */
  init() {
    const data = this.#inputModel.data;

    this.#renderEditor(this.#container);

    const editorInput = this.#editorComponent.element.querySelector(
      '.editor__pane_input'
    );

    this.#baseInputItemsList = new InputItemsListView({
      // onItemButtonClick: this.#handleInputItemButtonClick,
      // onItemInput: this.#handleItemInput,
    });

    this.#renderBaseInputList(this.#baseInputItemsList, editorInput);
    this.#renderComponentsFromData(data, this.#baseInputItemsList.element);
  }

  /**
   * Renders the editor component in the provided container.
   *
   * @param {HTMLElement} container - The container to render the editor.
   * @private
   */
  #renderEditor(container) {
    this.#editorComponent = new EditorView();

    render(this.#editorComponent, container);
  }

  /**
   * Renders the input section inside the specified container.
   *
   * @param {HTMLElement} container - The container for the input section.
   * @private
   */
  #renderBaseInputList(component, container) {
    render(component, container);
  }

  /**
   * Recursively renders components from the provided data into the specified container
   * for nested data.
   *
   * @param {Array} data - The array of data items to be rendered.
   * @param {HTMLElement} container - The DOM element where the components will be rendered.
   * @param {string|null} [parentId=null] - The ID of the parent component.
   */
  #renderComponentsFromData(data, container, parentId = null) {
    data.forEach((item) => {
      const inputItem = this.#createInputItemComponent(item, parentId);
      render(inputItem, container);

      if (Array.isArray(item.value)) {
        const inputItemsList = this.#createInputItemsListComponent(item.id);
        render(inputItemsList, container);

        this.#renderComponentsFromData(
          item.value,
          inputItemsList.element,
          item.id
        );
      }
    });
  }

  /**
   * Creates an input item component based on the provided item data.
   *
   * @param {Object} item - The data item used to create the input item component.
   * @param {string|null} parentId - The ID of the parent component, used for hierarchy.
   * @returns {InputItemView} The created input item component.
   */
  #createInputItemComponent(item, parentId) {
    return new InputItemView({
      id: item.id,
      key: item.key,
      value: item.value,
      parentId: parentId,
      inputValueDisabled: typeof item.value !== 'string', // Disable if value is a string
    });
  }

  /**
   * Creates an input items list component for the specified parent ID.
   *
   * @param {string|null} parentId - The ID of the parent component.
   * @returns {InputItemsListView} The created input items list component.
   */
  #createInputItemsListComponent(parentId) {
    return new InputItemsListView({ parentId: parentId, isNested: true });
  }

  // TODO: refactor this
  /**
   * Renders the output data in the output container.
   * This function can be refactored.
   *
   * @param {string} data - The output data to display.
   * @private
   */
  #renderOutputData() {
    const editorOutputContainer =
      this.#editorComponent.element.querySelector('#json-output');
    editorOutputContainer.textContent = this.#outputModel.data;
  }

  /**
   * Resets the editor state to its default configuration.
   * @returns {void}
   */
  reset() {
    this.#inputModel.setDefaultData();
    this.#outputModel.setDefaultData();
    remove(this.#editorComponent);
    this.init();
  }

  /**
   * Applies the changes made in input items to the models and renders the output data.
   * @returns {void}
   */
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
