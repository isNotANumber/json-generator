import { render, remove } from '../../framework/render';
import EditorView from '../../view/editor/editor-view';
import EditorInputPresenter from './editor-input-presenter.js';
import EditorOutputPresenter from './editor-output-presenter.js';

export default class EditorPresenter {
  #container = null;

  #editor = null;
  #editorInputPresenter = null;
  #editorOutputPresenter = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    this.#renderEditor(this.#container);
  }

  #renderEditor(container) {
    this.#editor = new EditorView();
    render(this.#editor, container);

    this.#editorInputPresenter = new EditorInputPresenter({container: this.#editor.element});
    this.#editorInputPresenter.init();

    this.#editorOutputPresenter = new EditorOutputPresenter({container: this.#editor.element});
    this.#editorOutputPresenter.init();
  }

  reset() {
    remove(this.#editor);
    this.init();
  }
}
