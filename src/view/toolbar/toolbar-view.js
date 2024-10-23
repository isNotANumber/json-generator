import AbstractView from "../../framework/view/abstract-view";

function createToolbarTemplate() {
    return (
        `
        <div class="toolbar">
          <div class="toolbar__left">
            <button class="toolbar__button toolbar__button--apply">Apply</button>
            <button class="toolbar__button toolbar__button--clear">Clear</button>
          </div>
          <div class="toolbar__right">
            <button class="toolbar__button toolbar__button--save">Save</button>
            <button class="toolbar__button toolbar__button--copy">Copy</button>
          </div>
        </div>
        `
    );
}

/**
 * Toolbar view class.
 */
export default class ToolbarView extends AbstractView {

    /**
     * Getter for toolbar template.
     * @abstract
     * @returns {string} Toolbar template as a string.
     */
    get template() {
        return createToolbarTemplate();
    }
}