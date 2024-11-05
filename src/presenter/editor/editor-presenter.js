import { render, remove, RenderPosition } from '../../framework/render';
import EditorView from '../../view/editor/editor-view';
import { generateRandomId } from '../../util.js';
import InputItemView from '../../view/input/input-item-view.js';
import InputItemsListView from '../../view/input/input-items-list-view.js';
import Adapter from '../../framework/view/adapter/adapter.js';

export default class EditorPresenter {
  #container = null;

  #editorComponent = null;
  #inputItemsListComponent = null;

  #inputItems = null;
  #nestedLists = null;

  #inputModel = null;
  #outputModel = null;

  constructor({ container, inputModel, outputModel }) {
    this.#container = container;
    this.#inputModel = inputModel;
    this.#outputModel = outputModel;
  }

  init() {
    this.#inputItems = {};
    this.#nestedLists = {};

    this.#renderEditor(this.#container);

    const editorInputContainer = this.#editorComponent.element.querySelector(
      '.editor__pane--input'
    );

    this.#renderInput(editorInputContainer);
  }

  #renderEditor(container) {
    this.#editorComponent = new EditorView();

    render(this.#editorComponent, container);
  }

  #renderInput(container) {
    this.#inputItemsListComponent = new InputItemsListView({
      onItemButtonClick: this.#handleGeneratorItemButtonClick,
      onItemInput: this.#handleItemInput,
    });

    render(this.#inputItemsListComponent, container);

    this.#inputItems = Adapter.convertModelDataToInputItems(this.#inputModel.generatorItems);

    this.#renderInputItems(this.#inputItems);
  }

  #renderInputItems(items) {
    for (const item of Object.values(items)) {
      if (item.element.dataset.parentId === 'null') {
        render(item, this.#inputItemsListComponent.element);
      } else {
        const nestedList = new InputItemsListView({
          isNested: true,
          parentId: item.element.dataset.parentId,
        });

        this.#nestedLists[item.element.dataset.parentId] = nestedList;

        render(nestedList, this.#inputItems[item.element.dataset.parentId].element, RenderPosition.AFTEREND)
        render(item, nestedList.element);
      }
    }
  }

  // refactor this
  #renderOutputData(data) {
    const editorOutputContainer =
      this.#editorComponent.element.querySelector('#json-output');
    editorOutputContainer.textContent = data;
  }

  #handleGeneratorItemButtonClick = (evt) => {
    const item = evt.target.closest('li');

    if (item) {
      if (evt.target.classList.contains('gnrt-btn--append')) {
        this.#handleAppendClick(item);
      } else if (evt.target.classList.contains('gnrt-btn--remove')) {
        this.#handleRemoveClick(item);
      }
    }
  };

  #handleAppendClick = (item) => {
    const targetId = item.dataset.id;

    const newItem = new InputItemView({
      id: generateRandomId(),
      key: '',
      value: '',
      parentId: targetId,
    });

    this.#inputItems[newItem.element.dataset.id] = newItem;

    if (this.#nestedLists[targetId]) {
      render(newItem, this.#nestedLists[targetId].element);
    } else {
      const nestedList = new InputItemsListView({
        isNested: true,
        parentId: targetId,
      });

      this.#nestedLists[targetId] = nestedList;

      render(nestedList, this.#inputItems[targetId].element, RenderPosition.AFTEREND)
      render(newItem, nestedList.element)
    }
  };

  #handleRemoveClick = (item) => {
    const targetId = item.dataset.id;

    if (this.#nestedLists[targetId]) {
      remove(this.#nestedLists[targetId])
      delete this.#nestedLists[targetId];
    }

    remove(this.#inputItems[targetId]);
    delete this.#inputItems[targetId];
  };

  #handleItemInput = (evt) => {
    const targetId = evt.target.closest('li').dataset.id;
    const targetItem = this.#inputItems[targetId];

    if (evt.target.classList.contains('generator-item__input-key')) {
      targetItem.updateElement({ key: evt.target.value });
    } else if (evt.target.classList.contains('generator-item__input-value')) {
      targetItem.updateElement({ value: evt.target.value });
    }
  };

  reset() {
    this.#inputModel.setDefaultData();
    this.#outputModel.setDefaultData();
    remove(this.#editorComponent);
    this.init();
  }

  apply() {
    const newData = Adapter.convertInputItemsToModel(this.#inputItems);
    this.#inputModel.data = newData;
    this.#outputModel.data = newData;

    this.#renderOutputData(this.#outputModel.outputJson);
  }
}
