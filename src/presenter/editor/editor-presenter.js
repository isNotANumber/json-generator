import { render, remove } from '../../framework/render';
import EditorView from '../../view/editor/editor-view';
import { generateRandomId, appendElementById } from '../../util.js';
import GeneratorItemView from '../../view/generator/generator-item-view.js';
import GeneratorInputListView from '../../view/generator/generator-input-list-view.js';
import EditorInputModel from '../../model/editor-input-model.js';
import EditorOutputModel from '../../model/editor-output-model.js';

export default class EditorPresenter {
  #container = null;

  #editorComponent = null;
  #generatorListComponent = null;

  #inputItems = {};

  #inputModel = null;
  #outputModel = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    this.#inputModel = new EditorInputModel();
    this.#outputModel = new EditorOutputModel();

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
        currentItemChildLocation = this.#generatorListComponent.element
          .querySelector(`[data-id='${item.element.dataset.parentId}'`)
          .querySelector('.generator-input-list--nested');

        render(item, currentItemChildLocation);
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
          onInput: this.#handleItemInput,
        });
        this.#fillItemsFromModel(item.value, item.id);
      } else {
        currentGeneratorItem = new GeneratorItemView({
          id: item.id,
          key: item.key,
          value: item.value,
          parentId: parentId,
          onInput: this.#handleItemInput,
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
            delete itemObj.parentId
            output.push(itemObj)
        } else {
            appendElementById(output, itemObj.parentId, itemObj)
            delete itemObj.parentId
        }
    }

    return output;
  }

  #handleGeneratorItemButtonClick = (evt) => {
    const item = evt.target.closest('li');

    if (item) {
      if (evt.target.classList.contains('gnrt-btn--append')) {
        const targetId = item.dataset.id;

        const newItem = new GeneratorItemView({
          id: generateRandomId(),
          key: '',
          value: '',
          parentId: targetId,
          onInput: this.#handleItemInput,
        });

        this.#inputItems[newItem.element.dataset.id] = newItem;

        const currentItemChildLocation = this.#inputItems[
          targetId
        ].element.querySelector('.generator-input-list--nested');

        render(newItem, currentItemChildLocation);
      } else if (evt.target.classList.contains('gnrt-btn--remove')) {
        const targetId = item.dataset.id;

        remove(this.#inputItems[targetId]);
        delete this.#inputItems[targetId];
      }
    }

    console.log(this.#inputItems)
  };

  #handleItemInput = (evt) => {
    const targetId = evt.target.closest('li').dataset.id;
    const targetItem = this.#inputItems[targetId];

    if (evt.target.classList.contains('generator-item__input-key')) {
      targetItem._setState({ key: evt.target.value });
    } else if (evt.target.classList.contains('generator-item__input-value')) {
      targetItem._setState({ value: evt.target.value });
    }
  };

  reset() {
    remove(this.#editorComponent);
    this.init();
  }

  apply() {
    const newData = this.#convertInputItemsToModel();
    this.#inputModel.updateData(newData);
    this.#outputModel.updateData(newData);

    this.#renderOutputData(this.#outputModel.outputJson);
  }
}
