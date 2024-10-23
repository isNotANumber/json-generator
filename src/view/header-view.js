import AbstractView from "../framework/view/abstract-view";

function createHeaderTemplate() {
    return (
        `
        <div class="header">
            <div class="header__logo">JSON Generator</div>
        </div>
        `
    );
}

/**
 * Header view class.
 */
export default class HeaderView extends AbstractView {

    /**
     * Getter for header template.
     * @abstract
     * @returns {string} Header template as a string.
     */
    get template() {
        return createHeaderTemplate();
    }
}