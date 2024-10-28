import { render, remove } from '../../framework/render.js';
import ModalView from '../../view/modal/modal-view.js';

export default class ModalPresenter {
  #container = null;
  #modal = null;
  #handleModalButtonClick = null;

  constructor({ container, onModalButtonClick }) {
    this.#container = container;

    this.#handleModalButtonClick = onModalButtonClick;
  }

  init() {
    this.#modal = new ModalView({onModalButtonClick: this.#handleModalButtonClick});

    render(this.#modal, this.#container);
  }

  destroy() {
    remove(this.#modal);
  }
}
