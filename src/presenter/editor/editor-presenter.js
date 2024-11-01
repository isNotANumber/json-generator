import { render, remove } from '../../framework/render';
import EditorView from '../../view/editor/editor-view';
import EditorInputPresenter from './editor-input-presenter.js';


export default class EditorPresenter {
  #container = null;

  #editorComponent = new EditorView();
  #editorInputPresenter = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    this.#renderEditor(this.#container);

    const editorInputContainer = this.#editorComponent.element.querySelector('.editor__pane--input');

    this.#editorInputPresenter = new EditorInputPresenter({container: editorInputContainer});
    this.#editorInputPresenter.init();
  }

  #renderEditor(container) {
    this.#editorComponent = new EditorView();

    render(this.#editorComponent, container);
  }

  reset() {
    remove(this.#editorComponent);
    this.init();
  }
}
