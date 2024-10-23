import AbstractView from "../../framework/view/abstract-view";

function createButtonTemplate({modifiers = [], buttonText}) {
    return (
        `
        <button class="button ${modifiers.join(' ')}">${buttonText}</button>
        `
    );
}

/**
 * Button view class.
 * @param {Array} modifiers - button class modifiers.
 * @param {String} buttonText - button text.
 */
export default class ButtonView extends AbstractView {
    #buttonText = null;
    #modifiers = null;

    constructor({modifiers, buttonText}) {
        super();
        this.#buttonText = buttonText;
        this.#modifiers = modifiers;
    }

    /**
     * Getter for button template.
     * @abstract
     * @returns {string} Button template as a string.
     */
    get template() {
        return createButtonTemplate({modifiers: this.#modifiers, buttonText: this.#buttonText});
    }
}