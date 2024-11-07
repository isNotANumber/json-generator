import AbstractView from '../../framework/view/abstract-view';

function createToolbarTemplate() {
  return (
    `
    <div class="toolbar">
        <div class="toolbar__left-side">
          <button class="button button_green toolbar__button_apply">Apply</button>
          <button class="button button_red toolbar__button_clear">Clear</button>
        </div>
        <div class="toolbar__right-side">
          <button class="button toolbar__button_save">Save</button>
          <button class="button toolbar__button_copy">Copy</button>
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
