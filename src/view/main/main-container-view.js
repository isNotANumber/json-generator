import AbstractView from "../../framework/view/abstract-view";

function createMainContainerTemplate() {
    return (
        `
        <div class="main-container"></div>
        `
    );
}

/**
 * Main container view class.
 */
export default class MainContainerView extends AbstractView {

    /**
     * Getter for main container template.
     * @abstract
     * @returns {string} Main container template as a string.
     */
    get template() {
        return createMainContainerTemplate();
    }
}