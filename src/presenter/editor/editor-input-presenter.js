import { render } from '../../framework/render';
import EditorInputView from '../../view/editor/editor-input-view';
import KeyValueListView from '../../view/key-value-generator/key-value-list-view.js';
import KeyValueGeneratorView from '../../view/key-value-generator/key-value-generator-view.js';
import ButtonView from '../../view/button/button-view.js';

export default class EditorInputPresenter {
  #container = null;

  #editorInput = null;
  #generatorList = null;
  #keyValueGenerator = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    this.#renderEditorInput(this.#container);
    this.#renderGeneratorList(this.#editorInput.element);
    this.#renderKeyValueGenerator(this.#generatorList.element);
  }

  #renderEditorInput(container) {
    this.#editorInput = new EditorInputView();

    render(this.#editorInput, container);
  }

  #renderGeneratorList(container) {
    this.#generatorList = new KeyValueListView();

    render(this.#generatorList, container);
  }

  #renderKeyValueGenerator(container) {
    this.#keyValueGenerator = new KeyValueGeneratorView();

    render(this.#keyValueGenerator, container);
    this.#renderButtons(this.#keyValueGenerator.element.querySelector('.generator__buttons-container'));
  }

  #renderButtons(container) {
    const appendButton = new ButtonView({
      modifiers: ['button--small'],
      buttonContent: '<i class="fas fa-plus"></i>',
      onClick: this.#handleGeneratorAppendClick,
    });
    const deleteButton = new ButtonView({
      modifiers: ['button--small', 'button--red'],
      buttonContent: '<i class="fas fa-minus"></i>',
      onClick: this.#handleGeneratorCancelClick,
    });

    render(appendButton, container);
    render(deleteButton, container);
  }

  #handleGeneratorAppendClick = (evt) => {
    const childContainer = evt.target.closest('li').querySelector('.key-value-generator__nested');

    this.#renderKeyValueGenerator(childContainer);
  }

  #handleGeneratorCancelClick = () => {
    console.log('Cancel button clicked!');
  }
}
