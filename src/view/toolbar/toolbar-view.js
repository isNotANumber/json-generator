import AbstractView from "../../framework/view/abstract-view";

function createToolbarTemplate() {
    return (
        `
        <div class="toolbar">
          <div class="toolbar__left">
          </div>
          <div class="toolbar__right">
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
     * @returns {string} Toolbar template as a string.
     */
    get template() {
        return createToolbarTemplate();
    }
}