import AbstractView from '../../framework/view/abstract-view';
import ButtonView from '../button/button-view.js';

function createToolbarTemplate() {
  const buttonsTemplate = [
    new ButtonView({
      modifiers: ['button--green tlb-btn--apply'],
      buttonContent: 'Apply',
    }).template,
    new ButtonView({
      modifiers: ['button--red tlb-btn--clear'],
      buttonContent: 'Clear',
    }).template,
    new ButtonView({ modifiers: ['tlb-btn--save'], buttonContent: 'Save' })
      .template,
    new ButtonView({ modifiers: ['tlb-btn--copy'], buttonContent: 'Copy' })
      .template,
  ];

  return `
        <div class="toolbar">
          <div class="toolbar__left">
            ${buttonsTemplate[0]}
            ${buttonsTemplate[1]}
          </div>
          <div class="toolbar__right">
            ${buttonsTemplate[2]}
            ${buttonsTemplate[3]}
          </div>
        </div>
        `;
}

/**
 * Toolbar view class.
 */
export default class ToolbarView extends AbstractView {
  #handleApplyClick = null;
  #handleClearClick = null;
  #handleSaveClick = null;
  #handleCopyClick = null;

  constructor({ onApplyClick, onClearClick, onSaveClick, onCopyClick }) {
    super();
    this.#handleApplyClick = onApplyClick;
    this.#handleClearClick = onClearClick;
    this.#handleSaveClick = onSaveClick;
    this.#handleCopyClick = onCopyClick;

    console.log(this.element)

    this.element.querySelector('.tlb-btn--apply').addEventListener('click', this.#applyClickHandler);
    this.element.querySelector('.tlb-btn--clear').addEventListener('click',this.#clearClickHandler);
    this.element.querySelector('.tlb-btn--save').addEventListener('click',this.#saveClickHandler);
    this.element.querySelector('.tlb-btn--copy').addEventListener('click',this.#copyClickHandler);
  }

  /**
   * Getter for toolbar template.
   * @returns {string} Toolbar template as a string.
   */
  get template() {
    return createToolbarTemplate();
  }

  #applyClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleApplyClick();
  };

  #clearClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClearClick();
  };

  #saveClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleSaveClick();
  };

  #copyClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCopyClick();
  };
}
