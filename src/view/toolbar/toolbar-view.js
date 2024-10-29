import AbstractView from '../../framework/view/abstract-view';

function createToolbarTemplate() {
  return (
    `
    <div class="toolbar">
        <div class="toolbar__left">
          <button class="button button--green tlb-btn--apply">Apply</button>
          <button class="button button--red tlb-btn--clear">Clear</button>
        </div>
        <div class="toolbar__right">
          <button class="button tlb-btn--save">Save</button>
          <button class="button tlb-btn--copy">Copy</button>
        </div>
    </div>
    `
    );
}

/**
 * Toolbar view class.
 */
export default class ToolbarView extends AbstractView {
  #handleToolbarButtonsClick = null;

  constructor({onToolbarButtonClick}) {
    super();

    this.#handleToolbarButtonsClick = onToolbarButtonClick;

    this.element.addEventListener('click', this.#handleToolbarButtonsClick);
  }

  /**
   * Getter for toolbar template.
   * @returns {string} Toolbar template as a string.
   */
  get template() {
    return createToolbarTemplate();
  }
}
