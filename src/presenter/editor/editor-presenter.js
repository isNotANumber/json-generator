import { render, remove } from '../../framework/render';
import EditorView from '../../view/editor/editor-view';
import { generateRandomId, deleteElementById } from '../../util.js';
import GeneratorItemView from '../../view/generator/generator-item-view.js';
import GeneratorInputListView from '../../view/generator/generator-input-list-view.js';
import EditorInputModel from '../../model/editor-input-model.js';
import EditorOutputModel from '../../model/editor-output-model.js';


export default class EditorPresenter {
  #container = null;

  #editorComponent = new EditorView();
  #generatorListComponent = null;

  #editorInputModel = new EditorInputModel();
  #editorOutputModel = new EditorOutputModel();

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    this.#renderEditor(this.#container);

    const editorInputContainer = this.#editorComponent.element.querySelector('.editor__pane--input');

    this.#renderGeneratorInputList(this.#editorInputModel.generatorItems, editorInputContainer);
  }

  #renderEditor(container) {
    this.#editorComponent = new EditorView();

    render(this.#editorComponent, container);
  }

  #renderGeneratorInputList(items, container) {
    this.#generatorListComponent = new GeneratorInputListView({
      items: items.map((item) => ({id: item.id, key: item.key, value: item.value})),
      onItemButtonClick: this.#handleGeneratorItemButtonClick,
    });

    render(this.#generatorListComponent, container);
    this.#fillStateFromModel(this.#editorInputModel.generatorItems)
    this.#renderListFromState(this.#generatorListComponent._state)
  }

  #renderGeneratorItem(item, container) {
    const newItem = new GeneratorItemView({id: item.id, key: item.key, value: item.value, parentId: item.parentId, onInput: this.#handleItemInput});
    render(newItem, container);
  }

  #renderListFromState(state) {
    for (const item of Object.values(state)) {
      const currentGeneratorItem = item;
      let currentGeneratorItemChildLocation = null;

      if (item.parentId === null) {
        this.#renderGeneratorItem(currentGeneratorItem, this.#generatorListComponent.element);

      } else {
        currentGeneratorItemChildLocation = this.#generatorListComponent.element.querySelector(`[data-id='${item.parentId}'`).querySelector('.generator-input-list--nested');
        this.#renderGeneratorItem(currentGeneratorItem, currentGeneratorItemChildLocation);
      }
    }
  }

  #fillStateFromModel(model, parentId = null) {
    for (const item of Object.values(model)) {
      let currentGeneratorItem = null;

      if (Array.isArray(item.value)) {
        currentGeneratorItem = {
          id: item.id,
          key: item.key,
          value: '',
          parentId: parentId
        }
        this.#fillStateFromModel(item.value, item.id);

      } else {
        currentGeneratorItem = {
          id: item.id,
          key: item.key,
          value: item.value,
          parentId: parentId
        }
      }

      this.#generatorListComponent._setState({[currentGeneratorItem.id]: currentGeneratorItem});
    }
  }

  // refactor this
  #renderOutputData(data) {
    const editorOutputContainer = this.#editorComponent.element.querySelector('#json-output');
    editorOutputContainer.textContent = data;
  }

  #convertInputStateToModel() {
    const output = [];
    const map = {};
    const state = this.#generatorListComponent._state;

    for (const key in state) {
        const item = state[key];
        map[item.id] = { id: item.id, key: item.key, value: item.value ? item.value : [] };
    }

    for (const key in state) {
        const item = state[key];
        if (item.parentId) {
            map[item.parentId].value = [];
            map[item.parentId].value.push(map[item.id]);
        } else {
            output.push(map[item.id]);
        }
    }

    return output;
}

  #handleGeneratorItemButtonClick = (evt) => {
    const item = evt.target.closest('li');

    if (item) {
      if (evt.target.classList.contains('gnrt-btn--append')) {
        const targetId = item.dataset.id;
        const newItem = {id: generateRandomId(), key: '', value: '', parentId: targetId};
  
        this.#generatorListComponent.updateElement({[newItem.id]: newItem});
        this.#renderListFromState(this.#generatorListComponent._state);
  
      } else if (evt.target.classList.contains('gnrt-btn--remove')) {
        const targetId = item.dataset.id;

        const newState = deleteElementById(this.#generatorListComponent._state, targetId);

        this.#generatorListComponent.updateElement(newState, 'rewrite');
        this.#renderListFromState(this.#generatorListComponent._state);
      }
    }
  };

  #handleItemInput = (evt) => {
    const targetId = evt.target.closest('li').dataset.id;
    const targetItem = this.#generatorListComponent._state[targetId];

    if (evt.target.classList.contains('generator-item__input-key')) {
      targetItem.key = evt.target.value;

    } else if (evt.target.classList.contains('generator-item__input-value')) {
      targetItem.value = evt.target.value;
    }

    this.#generatorListComponent._state[targetId] = targetItem;
  }

  reset() {
    remove(this.#editorComponent);
    this.init();
  }

  apply() {
    const newData = this.#convertInputStateToModel();
    this.#editorInputModel.updateData(newData);
    this.#editorOutputModel.updateData(newData);

    this.#renderOutputData(this.#editorOutputModel.outputJson);
  }
}
