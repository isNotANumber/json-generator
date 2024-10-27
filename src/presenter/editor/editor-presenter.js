import { render } from '../../framework/render';
import EditorInputView from '../../view/editor/editor-input-view';
import EditorOutputView from '../../view/editor/editor-output-view';
import EditorView from '../../view/editor/editor-view';
import KeyValueListView from '../../view/key-value-generator/key-value-list-view.js';
import KeyValueGeneratorView from '../../view/key-value-generator/key-value-generator-view.js';
import ButtonView from '../../view/button/button-view.js';

export default class EditorPresenter {
  #container = null;

  #editor = null;
  #editorInput = null;
  #editorOutput = null;
  #generatorList = null;
  #keyValueGenerator = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    this.#renderEditor(this.#container);
    this.#renderEditorInput(this.#editor.element);
    this.#renderEditorOutput(this.#editor.element);
    this.#renderGeneratorList(this.#editorInput.element);
    this.#renderKeyValueGenerator(this.#generatorList.element);
  }

  #renderEditor(container) {
    this.#editor = new EditorView();

    render(this.#editor, container);
  }

  #renderEditorInput(container) {
    this.#editorInput = new EditorInputView();

    render(this.#editorInput, container);
  }

  #renderEditorOutput(container) {
    this.#editorOutput = new EditorOutputView();

    render(this.#editorOutput, container);
  }

  #renderGeneratorList(container) {
    this.#generatorList = new KeyValueListView();

    render(this.#generatorList, container);
  }

  #renderKeyValueGenerator(container) {
    this.#keyValueGenerator = new KeyValueGeneratorView();

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

    render(this.#keyValueGenerator, container);
    render(appendButton, this.#keyValueGenerator.element);
    render(deleteButton, this.#keyValueGenerator.element);
  }

  #handleGeneratorAppendClick() {
    console.log('Append button clicked!')
  }

  #handleGeneratorCancelClick() {
    console.log('Cancel button clicked!')
  }
}
