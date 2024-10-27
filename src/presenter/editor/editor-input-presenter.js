import { render } from '../../framework/render';
import EditorInputView from '../../view/editor/editor-input-view';
import KeyValueGeneratorView from '../../view/key-value-generator/key-value-generator-view.js';
import ButtonView from '../../view/button/button-view.js';
import GeneratorInputListView from '../../view/key-value-generator/generator-input-list-view.js';

export default class EditorInputPresenter {
  #container = null;

  #editorInput = null;
  #generatorInputList = null;
  #keyValueGenerator = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    this.#renderEditorInput(this.#container);
    this.#renderGeneratorInputList(this.#editorInput.element);
    this.#renderKeyValueGenerator(this.#generatorInputList.element);
  }

  #renderEditorInput(container) {
    this.#editorInput = new EditorInputView();

    render(this.#editorInput, container);
  }

  #renderGeneratorInputList(container) {
    this.#generatorInputList = new GeneratorInputListView();

    render(this.#generatorInputList, container);
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
    const childContainer = evt.target.closest('li').querySelector('.key-value-list--nested');

    this.#renderKeyValueGenerator(childContainer);
  }

  #handleGeneratorCancelClick = (evt) => {
    console.log('Cancel button clicked!');

    const targetToRemove = evt.target.closest('li');
    targetToRemove.remove();
  }
}
