import AbstractView from "../../framework/view/abstract-view";

function createMainContentTemplate() {
    return (
        `
        <div class="main-content"></div>
        `
    );
}

function createMainContainerTemplate() {
    const mainContent = createMainContentTemplate();

    return (
        `
        <div class="main-container">
            ${mainContent}
        </div>
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