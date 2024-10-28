import { render } from '../../framework/render';
import EditorInputView from '../../view/editor/editor-input-view';
import GeneratorItemView from '../../view/generator/generator-item-view.js';
import GeneratorInputListView from '../../view/generator/generator-input-list-view.js';

export default class EditorInputPresenter {
  #container = null;

  #editorInput = null;
  #generatorInputList = null;
  #generatorItem = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    this.#renderEditorInput(this.#container);
    this.#renderGeneratorInputList(this.#editorInput.element);
    this.#renderGeneratorItem(this.#generatorInputList.element);
  }

  #renderEditorInput(container) {
    this.#editorInput = new EditorInputView();

    render(this.#editorInput, container);
  }

  #renderGeneratorInputList(container) {
    this.#generatorInputList = new GeneratorInputListView({
      onItemButtonClick: this.#handleGeneratorItemButtonClick,
    });

    render(this.#generatorInputList, container);
  }

  #renderGeneratorItem(container) {
    this.#generatorItem = new GeneratorItemView();

    render(this.#generatorItem, container);
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
      console.log(this.#generatorInputList.element.children);
      evt.target.closest('li').remove();
    }
  };
}
