import { createElement } from "../render";

/**
 * Abstract view class.
 */
export default class AbstractView {
    /**
     * @type {HTMLElement|null} - view element.
     */
    #element = null;

    constructor() {
        if (new.target === AbstractView) {
            throw new Error('AbstractView instantiation restricted.');
        }
    }

    /**
     * Getter for element template.
     * @abstract
     * @returns {string} Element template as a string.
     */
    get template() {
        throw new Error('Abstract method not implemented: get template');
    }

    /**
     * Getter for element.
     * @returns {HTMLElement} View element.
     */
    get element() {
        if (!this.#element) {
            this.#element = createElement(this.template);
        }

        return this.#element;
    }

    /**
     * Remove view element method.
     */
    removeElement() {
        this.#element = null;
    }
}