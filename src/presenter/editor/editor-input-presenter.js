import { render } from '../../framework/render.js';
import { generateRandomId, deleteElementById } from '../../util.js';
import GeneratorItemView from '../../view/generator/generator-item-view.js';
import GeneratorInputListView from '../../view/generator/generator-input-list-view.js';
import GeneratorListModel from '../../model/generator-list-model.js';


export default class EditorInputPresenter {
  #container = null;

  #generatorListModel = new GeneratorListModel();

  #generatorListComponent = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    this.#renderGeneratorInputList(this.#generatorListModel.generatorItems, this.#container);
  }

  #renderGeneratorInputList(items, container) {
    this.#generatorListComponent = new GeneratorInputListView({
      items: items.map((item) => ({id: item.id, key: item.key, value: item.value})),
      onItemButtonClick: this.#handleGeneratorItemButtonClick,
    });

    render(this.#generatorListComponent, container);
    this.#fillStateFromModel(this.#generatorListModel.generatorItems)
    this.#renderListFromState(this.#generatorListComponent._state)
  }

  #renderGeneratorItem(item, container) {
    const newItem = new GeneratorItemView({id: item.id, key: item.key, value: item.value, parentId: item.parentId});
    render(newItem, container);
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
}
