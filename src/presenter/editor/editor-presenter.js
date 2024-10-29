import { render, remove } from '../../framework/render';
import EditorView from '../../view/editor/editor-view';
import GeneratorItemView from '../../view/generator/generator-item-view.js';
import GeneratorInputListView from '../../view/generator/generator-input-list-view.js';


export default class EditorPresenter {
  #container = null;

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
    this.#renderGeneratorItem(this.#generatorInputListComponent.element);
  }

  #renderEditor(container) {
    this.#editorComponent = new EditorView();

    render(this.#editorComponent, container);
  }

  #renderGeneratorInputList(container) {
    this.#generatorInputListComponent = new GeneratorInputListView({
      onItemButtonClick: this.#handleGeneratorItemButtonClick,
    });

    render(this.#generatorInputListComponent, container);
  }

  #renderGeneratorItem(container) {
    this.#generatorItemComponent = new GeneratorItemView();

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
      evt.target.classList.contains('gnrt-btn--remove') &&
      evt.target
        .closest('ul')
        .classList.contains('generator-input-list--nested')
    ) {
      console.log(this.#generatorInputListComponent.element.children);
      evt.target.closest('li').remove();
    }
  };

  reset() {
    remove(this.#editorComponent);
    this.init();
  }
}
