import AbstractView from "../../framework/view/abstract-view";

function createButtonTemplate({modifiers = [], buttonContent}) {
    return (
        `
        <button class="button ${modifiers.join(' ')}">${buttonContent}</button>
        `
    );
}

/**
 * Button view class.
 * @param {Array} modifiers - button class modifiers.
 * @param {String} buttonContent - button content.
 */
export default class ButtonView extends AbstractView {
    #buttonContent = null;
    #modifiers = null;

    constructor({modifiers, buttonContent}) {
        super();
        this.#buttonContent = buttonContent;
        this.#modifiers = modifiers;
    }

    /**
     * Getter for button template.
     * @abstract
     * @returns {string} Button template as a string.
     */
    get template() {
        return createButtonTemplate({modifiers: this.#modifiers, buttonContent: this.#buttonContent});
    }
}