import AbstractView from "../../framework/view/abstract-stateful-view.js";

function createGeneratorInputListTemplate() {
    return (
        `
        <ul class="generator-input-list"></ul>
        `
    );
}

/**
 * Generator input list view class.
 */
export default class GeneratorInputListView extends AbstractView {

    #handleItemButtonClick = null;

    constructor({onItemButtonClick}) {
        super();
        this.#handleItemButtonClick = onItemButtonClick;

        
        this.element.addEventListener('click', this.#handleItemButtonClick);
    }

    /**
     * Getter for generator input list template.
     * @abstract
     * @returns {string} Generator input list template as a string.
     */
    get template() {
        return createGeneratorInputListTemplate();
    }
}