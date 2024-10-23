import AbstractView from "../../framework/view/abstract-view";

function createButtonTemplate({type, text}) {
    return (
        `
        <button class="button button--small">Copy</button>
        `
    );
}

/**
 * Button view class.
 */
export default class ButtonView extends AbstractView {

    /**
     * Getter for button template.
     * @abstract
     * @returns {string} Button template as a string.
     */
    get template() {
        return createButtonTemplate();
    }
}