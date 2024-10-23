import AbstractView from "../../framework/view/abstract-view";

function createMainContentTemplate() {
    return (
        `
        <div class="main-content"></div>
        `
    );
}

/**
 * Main content view class.
 */
export default class MainContentView extends AbstractView {

    /**
     * Getter for main content template.
     * @abstract
     * @returns {string} Main content template as a string.
     */
    get template() {
        return createMainContentTemplate();
    }
}