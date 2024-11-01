import { render, remove } from '../../framework/render.js';
import GeneratorItemView from '../../view/generator/generator-item-view.js';
import GeneratorInputListView from '../../view/generator/generator-input-list-view.js';
import GeneratorListModel from '../../model/generator-list-model.js';


export default class EditorInputPresenter {
  #container = null;
  #generatorItemsComponents = {};

  #generatorListModel = new GeneratorListModel();

  #generatorInputListComponent = null;
  #generatorItemComponent = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    this.#renderGeneratorInputList(this.#generatorListModel.generatorItems, this.#container);
    // this.#testSetState();
    console.log(this.#generatorInputListComponent._state)
  }

  #testSetState() {
    // console.log(this)
    // this.#generatorInputListComponent._setState(this.#generatorItemsComponents);
  }

  // refactor this
  #renderGeneratorInputList(items, container) {
    this.#generatorInputListComponent = new GeneratorInputListView({
      items: items.map((item) => ({id: item.id, key: item.key, value: item.value})),
      onItemButtonClick: this.#handleGeneratorItemButtonClick,
    });

    render(this.#generatorInputListComponent, container);
    this.#renderItemsListFromModel(this.#generatorListModel.generatorItems, this.#generatorInputListComponent.element);
  }

  // refactor this
  #renderGeneratorItem(container, id, key = '', value = '') {
    this.#generatorItemComponent = new GeneratorItemView({id: id, key: key, value: value});

    render(this.#generatorItemComponent, container);
  }

  #handleGeneratorItemButtonClick = (evt) => {
    const item = evt.target.closest('li');

    if (item) {
      if (evt.target.classList.contains('gnrt-btn--append')) {
        const targetId = item.dataset.id;
        const targetComponent = this.#generatorItemsComponents[targetId];
        const childContainer = targetComponent.element.querySelector('.generator-input-list--nested');
        const newItem = new GeneratorItemView({id: '100', key: 'test', value: 'test'});
  
        this.#generatorItemsComponents[newItem._state.id] = newItem;
        render(newItem, childContainer);
        console.log(this.#generatorInputListComponent._state)
  
      } else if (evt.target.classList.contains('gnrt-btn--remove')) {
        const targetId = item.dataset.id;

        remove(this.#generatorItemsComponents[targetId])
        delete this.#generatorItemsComponents[targetId];
      }
    }
  };

  #renderItemsListFromModel(model, container) {
    for (const item of Object.values(model)) {
      let currentGeneratorItem = null;
      let currentGeneratorItemChildLocation = null;

      if (Array.isArray(item.value)) {
        currentGeneratorItem = new GeneratorItemView({
          id: item.id,
          key: item.key,
          value: ''
        })

        currentGeneratorItemChildLocation = currentGeneratorItem.element.querySelector('.generator-input-list--nested');
        this.#renderItemsListFromModel(item.value, currentGeneratorItemChildLocation);

      } else {
        currentGeneratorItem = new GeneratorItemView({
          id: item.id,
          key: item.key,
          value: item.value,
        })
      }

      // this.#generatorInputListComponent._setState(currentGeneratorItem.element.id = currentGeneratorItem);
      this.#generatorItemsComponents[currentGeneratorItem._state.id] = currentGeneratorItem;

      render(currentGeneratorItem, container)
    }
  }
}
