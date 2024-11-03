import { render, remove } from '../../framework/render.js';
import { generateRandomId } from '../../util.js';
import GeneratorItemView from '../../view/generator/generator-item-view.js';
import GeneratorInputListView from '../../view/generator/generator-input-list-view.js';
import GeneratorListModel from '../../model/generator-list-model.js';


export default class EditorInputPresenter {
  #container = null;

  #generatorListModel = new GeneratorListModel();

  #generatorInputListComponent = null;
  #generatorItemComponent = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    this.#renderGeneratorInputList(this.#generatorListModel.generatorItems, this.#container);
  }

  // refactor this
  #renderGeneratorInputList(items, container) {
    this.#generatorInputListComponent = new GeneratorInputListView({
      items: items.map((item) => ({id: item.id, key: item.key, value: item.value})),
      onItemButtonClick: this.#handleGeneratorItemButtonClick,
    });

    render(this.#generatorInputListComponent, container);
    this.#fillStateFromModel(this.#generatorListModel.generatorItems)
    this.#renderListFromState(this.#generatorInputListComponent._state)
  }

  #renderGeneratorItem(item, container) {
    this.#generatorItemComponent = new GeneratorItemView({id: item.id, key: item.key, value: item.value, parentId: item.parentId});

    render(this.#generatorItemComponent, container);
  }

  #handleGeneratorItemButtonClick = (evt) => {
    const item = evt.target.closest('li');

    if (item) {
      if (evt.target.classList.contains('gnrt-btn--append')) {
        const targetId = item.dataset.id;
        const newItem = {id: generateRandomId(), key: '', value: '', parentId: targetId};
  
        
        this.#generatorInputListComponent.updateElement({[newItem.id]: newItem});
        this.#renderListFromState(this.#generatorInputListComponent._state);
  
      } else if (evt.target.classList.contains('gnrt-btn--remove')) {
        const targetId = item.dataset.id;

        // remove(this.#generatorItemsComponents[targetId])
        // delete this.#generatorItemsComponents[targetId];
      }
    }
  };

  #renderListFromState(state) {
    for (const item of Object.values(state)) {
      const currentGeneratorItem = item;
      let currentGeneratorItemChildLocation = null;

      if (item.parentId === null) {
        this.#renderGeneratorItem(currentGeneratorItem, this.#generatorInputListComponent.element);

      } else {
        currentGeneratorItemChildLocation = this.#generatorInputListComponent.element.querySelector(`[data-id='${item.parentId}'`).querySelector('.generator-input-list--nested');
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

      this.#generatorInputListComponent._setState({[currentGeneratorItem.id]: currentGeneratorItem});
    }
  }
}
