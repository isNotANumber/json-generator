import { render } from '../../framework/render.js';
import ButtonView from '../../view/button/button-view.js';
import ToolbarView from '../../view/toolbar/toolbar-view.js';

export default class ToolbarPresenter {
  #container = null;
  
  #handleApplyClick = null;
  #handleClearClick = null;
  #handleCopyClick = null;
  #handleSaveClick = null;

  constructor({ container, onApplyClick, onClearClick, onSaveClick, onCopyClick }) {
    this.#container = container;

    this.#handleApplyClick = onApplyClick;
    this.#handleClearClick = onClearClick;
    this.#handleSaveClick = onSaveClick;
    this.#handleCopyClick = onCopyClick;

  }

  init() {
    const toolbar = new ToolbarView();

    render(toolbar, this.#container);
    this.#renderButtons(toolbar);
  }

  #renderButtons(toolbar) {
    const toolbarLeft = toolbar.element.querySelector('.toolbar__left');
    const toolbarRight = toolbar.element.querySelector('.toolbar__right');

    const applyButton = new ButtonView({modifiers: ['button--green', 'tlb-btn--apply'], buttonContent: 'Apply', onClick: this.#handleApplyClick});
    const clearButton = new ButtonView({modifiers: ['button--red', 'tlb-btn--clear'], buttonContent: 'Clear', onClick: this.#handleClearClick});
    const saveButton = new ButtonView({modifiers: ['tlb-btn--save'], buttonContent: 'Save', onClick: this.#handleSaveClick});
    const sopyButton = new ButtonView({modifiers: ['tlb-btn--copy'], buttonContent: 'Copy', onClick: this.#handleCopyClick});

    render(applyButton, toolbarLeft);
    render(clearButton, toolbarLeft);
    render(saveButton, toolbarRight);
    render(sopyButton, toolbarRight);
  }
}
