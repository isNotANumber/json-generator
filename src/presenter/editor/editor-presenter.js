import { render, remove } from '../../framework/render';
import EditorView from '../../view/editor/editor-view';
import { generateRandomId, appendElementById } from '../../util.js';
import GeneratorItemView from '../../view/generator/generator-item-view.js';
import GeneratorInputListView from '../../view/generator/generator-input-list-view.js';

export default class EditorPresenter {
  #container = null;

  #editorComponent = null;
  #generatorListComponent = null;

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
    this.#generatorListComponent = new GeneratorInputListView({
      onItemButtonClick: this.#handleGeneratorItemButtonClick,
      onItemInput: this.#handleItemInput,
    });

    render(this.#generatorListComponent, container);

    this.#fillItemsFromModel(this.#inputModel.generatorItems);

    this.#renderInputItems(this.#inputItems);
  }

  #renderInputItems(items) {
    for (const item of Object.values(items)) {
      let currentItemChildLocation = null;

      if (item.element.dataset.parentId === 'null') {
        render(item, this.#generatorListComponent.element);
      } else {
        const nestedList = new GeneratorInputListView({
          isNested: true,
          parentId: item.element.dataset.parentId,
        });

        this.#nestedLists[item.element.dataset.parentId] = nestedList;

        render(nestedList, this.#inputItems[item.element.dataset.parentId].element, 'afterend')
        render(item, nestedList.element);
      }
    }
  }

  #fillItemsFromModel(model, parentId = null) {
    for (const item of Object.values(model)) {
      let currentGeneratorItem = null;

      if (Array.isArray(item.value)) {
        currentGeneratorItem = new GeneratorItemView({
          id: item.id,
          key: item.key,
          value: '',
          parentId: parentId,
        });
        this.#fillItemsFromModel(item.value, item.id);
      } else {
        currentGeneratorItem = new GeneratorItemView({
          id: item.id,
          key: item.key,
          value: item.value,
          parentId: parentId,
        });
      }

      this.#inputItems[currentGeneratorItem.element.dataset.id] =
        currentGeneratorItem;
    }
  }

  // refactor this
  #renderOutputData(data) {
    const editorOutputContainer =
      this.#editorComponent.element.querySelector('#json-output');
    editorOutputContainer.textContent = data;
  }

  #convertInputItemsToModel() {
    const output = [];
    const items = this.#inputItems;

    for (const item of Object.values(items)) {
      const itemObj = item.convertToObject();

      if (itemObj.parentId === 'null') {
        delete itemObj.parentId;
        output.push(itemObj);
      } else {
        appendElementById(output, itemObj.parentId, itemObj);
        delete itemObj.parentId;
      }
    }

    return output;
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

    const newItem = new GeneratorItemView({
      id: generateRandomId(),
      key: '',
      value: '',
      parentId: targetId,
    });

    this.#inputItems[newItem.element.dataset.id] = newItem;

    if (this.#nestedLists[targetId]) {
      render(newItem, this.#nestedLists[targetId].element);
    } else {
      const nestedList = new GeneratorInputListView({
        isNested: true,
        parentId: targetId,
      });

      this.#nestedLists[targetId] = nestedList;

      render(nestedList, this.#inputItems[targetId].element, 'afterend')
      render(newItem, nestedList.element)
    }
  };

  #handleRemoveClick = (item) => {
    const targetId = item.dataset.id;
    const targetNestedList = this.#nestedLists[targetId];

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
      targetItem.updateElement({ key: evt.target.value });
    }
  };

  reset() {
    this.#inputModel.setDefaultData();
    this.#outputModel.setDefaultData();
    remove(this.#editorComponent);
    this.init();
  }

  apply() {
    const newData = this.#convertInputItemsToModel();
    this.#inputModel.data = newData;
    this.#outputModel.data = newData;

    this.#renderOutputData(this.#outputModel.outputJson);
  }
}
