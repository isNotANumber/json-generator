import { render, remove } from '../../framework/render';
import EditorView from '../../view/editor/editor-view';
import InputPresenter from './input/input-presenter.js';

export default class EditorPresenter {
  #container = null;

  #inputPresenter = null;

  #editorComponent = null;

  #inputModel = null;
  #outputModel = null;

  constructor({ container, inputModel, outputModel }) {
    this.#container = container;
    this.#inputModel = inputModel;
    this.#outputModel = outputModel;
  }

  init() {
    this.#renderEditor(this.#container);
    this.#renderInputItemsList(this.#editorComponent.inputContainer)
  }

  #renderEditor(container) {
    this.#editorComponent = new EditorView();

    render(this.#editorComponent, container);
  }

  #renderInputItemsList(container) {
    this.#inputPresenter = new InputPresenter({
      container: container,
      inputModel: this.#inputModel,
    });

    this.#inputPresenter.init();
  }

  // TODO: refactor this
  #renderOutputData(data) {
    const editorOutputContainer =
      this.#editorComponent.element.querySelector('#json-output');
    editorOutputContainer.textContent = data;
  }

  reset() {
    this.#inputModel.setDefaultData();
    this.#outputModel.setDefaultData();
    remove(this.#editorComponent);
    this.init();
  }

  apply() {
    const newData = this.#inputPresenter.dataAsObj;
    this.#inputModel.data = newData;
    this.#outputModel.data = newData;

    this.#renderOutputData(this.#outputModel.data);
  }
}
