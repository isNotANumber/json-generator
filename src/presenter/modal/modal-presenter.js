import { render, remove } from '../../framework/render.js';
import ModalView from '../../view/modal/modal-view.js';
import ButtonView from '../../view/button/button-view.js';

export default class ModalPresenter {
  #container = null;

  #modal = new ModalView();

  #handleApplyClick = null;
  #handleCancelClick = null;

  constructor({ container, onApplyClick, onCancelClick }) {
    this.#container = container;

    this.#handleApplyClick = onApplyClick;
    this.#handleCancelClick = onCancelClick;
  }

  init() {
    this.#renderModal(this.#container);
  }

  #renderModal(container) {
    render(this.#modal, container);

    this.#renderButtons(this.#modal.element.querySelector('.modal__content__buttons'));
  }

  #renderButtons(modal) {
    const applyButton = new ButtonView({
      modifiers: ['button--red', 'modal-btn--apply'],
      buttonContent: 'Confirm',
      onClick: this.#handleApplyClick,
    });
    const cancelButton = new ButtonView({
      modifiers: ['modal-btn--cancel'],
      buttonContent: 'Cancel',
      onClick: this.#handleCancelClick,
    });

    render(applyButton, modal);
    render(cancelButton, modal);
  }

  destroy() {
    remove(this.#modal);
  }
}
