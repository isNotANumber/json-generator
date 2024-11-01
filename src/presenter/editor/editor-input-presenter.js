import { render } from '../../framework/render.js';
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
    this.#renderGeneratorInputList(this.#container);
    this.#buldGeneratorItemsListFromModel(this.#generatorListModel.generatorItems, this.#generatorInputListComponent.element);
  }

  // refactor this
  #renderGeneratorInputList(container) {
    this.#generatorInputListComponent = new GeneratorInputListView({
      onItemButtonClick: this.#handleGeneratorItemButtonClick,
    });

    render(this.#generatorInputListComponent, container);
  }

  // refactor this
  #renderGeneratorItem(container, id, key = '', value = '') {
    this.#generatorItemComponent = new GeneratorItemView({id: id, key: key, value: value});

    render(this.#generatorItemComponent, container);
  }

  // TODO: refactor this
  #handleGeneratorItemButtonClick = (evt) => {
    const itemLi = evt.target.closest('li');
    const itemChildContainer = itemLi.querySelector('.generator-input-list--nested');
    const targetItemId = itemLi.querySelector('div').dataset.id;
    const targetItemKeyInput = itemLi.querySelector('.generator-item__input-key');

    if (evt.target.classList.contains('gnrt-btn--append') && itemChildContainer.children.length < 3) {
      const newItem = {id: '100'};

      this.#generatorListModel.updateItemById(targetItemId, {id: targetItemId, key: targetItemKeyInput.value})
      this.#generatorListModel.appendItemById(targetItemId, newItem);

      console.log(this.#generatorListModel.generatorItems);

      this.#renderGeneratorItem(itemChildContainer, newItem.id);

    } else if (evt.target.classList.contains('gnrt-btn--remove')) {

      this.#generatorListModel.removeItemById(targetItemId);
      itemLi.remove();
    }
  };

  #buldGeneratorItemsListFromModel(items, container) {
    for (const item of items) {
      let currentGeneratorItem = null;
      let currentGeneratorItemChildLocation = null;

      if (Array.isArray(item.value)) {
        currentGeneratorItem = new GeneratorItemView({
          id: item.id,
          key: item.key,
          value: ''
        })

        currentGeneratorItemChildLocation = currentGeneratorItem.element.querySelector('.generator-input-list--nested');
        this.#buldGeneratorItemsListFromModel(item.value, currentGeneratorItemChildLocation);

      } else {
        currentGeneratorItem = new GeneratorItemView({
          id: item.id,
          key: item.key,
          value: item.value,
        })
      }

      render(currentGeneratorItem, container)
    }
  }
}
