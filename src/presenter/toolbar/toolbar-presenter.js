import { render } from '../../framework/render.js';
import ToolbarView from '../../view/toolbar/toolbar-view.js';

export default class ToolbarPresenter {
  #container = null;

  #toolbar = new ToolbarView();
  
  #handleToolbarButtonsClick = null;

  constructor({ container, onToolbarButtonClick }) {
    this.#container = container;

    this.#handleToolbarButtonsClick = onToolbarButtonClick;

    this.#toolbar.element.addEventListener('click', this.#handleToolbarButtonsClick);
  }

  init() {
    render(this.#toolbar, this.#container);
  }
}
