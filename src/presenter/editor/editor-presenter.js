import { render, remove } from '../../framework/render';
import EditorView from '../../view/editor/editor-view';
import GeneratorItemView from '../../view/generator/generator-item-view.js';
import GeneratorInputListView from '../../view/generator/generator-input-list-view.js';
import GeneratorListModel from '../../model/generator-list-model.js';


export default class EditorPresenter {
  #container = null;

  #generatorListModel = new GeneratorListModel(); 

  #editorComponent = new EditorView();

  #generatorInputListComponent = null;
  #generatorItemComponent = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    this.#renderEditor(this.#container);

    const editorInputContainer = this.#editorComponent.element.querySelector('.editor__pane--input');
    
    this.#renderGeneratorInputList(editorInputContainer);
    this.#buldComponentFromModel(this.#generatorListModel.generatorItems, this.#generatorInputListComponent.element);
    // this.#renderGeneratorItem(this.#generatorInputListComponent.element);
  }

  #renderEditor(container) {
    this.#editorComponent = new EditorView();

    render(this.#editorComponent, container);
  }

  // refactor this
  #renderGeneratorInputList(container) {
    this.#generatorInputListComponent = new GeneratorInputListView({
      onItemButtonClick: this.#handleGeneratorItemButtonClick,
    });

    render(this.#generatorInputListComponent, container);
  }

  // refactor this
  #renderGeneratorItem(container) {
    this.#generatorItemComponent = new GeneratorItemView({id: null, key: null, value: null, child: null});

    render(this.#generatorItemComponent, container);
  }

  // TODO: refactor this
  #handleGeneratorItemButtonClick = (evt) => {
    if (evt.target.classList.contains('gnrt-btn--append') && evt.target
    .closest('li')
    .querySelector('.generator-input-list--nested').children.length < 3) {
      const childContainer = evt.target
        .closest('li')
        .querySelector('.generator-input-list--nested');
      this.#renderGeneratorItem(childContainer);
    } else if (
      evt.target.classList.contains('gnrt-btn--remove') 
      // &&
      // evt.target
      //   .closest('ul')
      //   .classList.contains('generator-input-list--nested')
    ) {
      evt.target.closest('li').remove();
    }
  };

  #buldComponentFromModel(items, container) {
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
        this.#buldComponentFromModel(item.value, currentGeneratorItemChildLocation);

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

  reset() {
    remove(this.#editorComponent);
    this.init();
  }
}
