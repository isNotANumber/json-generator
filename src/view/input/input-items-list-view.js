import AbstractView from "../../framework/view/abstract-stateful-view.js";

function createItemsListTemplate({parentId, isNested}) {
    return (
        `
        <ul data-parent-id=${parentId} class="generator-input-list ${isNested ? 'generator-input-list--nested' : ''}"></ul>
        `
    );
}

/**
 * Generator input list view class.
 */
export default class InputItemsListView extends AbstractView {

    #handleItemButtonClick = null;
    #handleItemInput = null;
    #isNested = false;
    #parentId = null;

    constructor({onItemButtonClick, onItemInput, isNested, parentId = null}) {
        super();
        this.#handleItemButtonClick = onItemButtonClick;
        this.#handleItemInput = onItemInput;
        this.#isNested = isNested;
        this.#parentId = parentId;

        if (!this.#isNested) {
            this.element.addEventListener('click', this.#handleItemButtonClick);
            this.element.addEventListener('change', this.#handleItemInput);
        }        
    }

    /**
     * Getter for generator input list template.
     * @abstract
     * @returns {string} Generator input list template as a string.
     */
    get template() {
        return createItemsListTemplate({parentId: this.#parentId,isNested: this.#isNested});
    }
}