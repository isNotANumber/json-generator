import AbstractView from "../../../framework/view/abstract-view.js";

function createItemsListTemplate({parentId, isNested}) {
    return (
        `
        <ul data-parent-id=${parentId} class="input-list ${isNested ? 'input-list_nested' : ''}"></ul>
        `
    );
}

/**
 * Input list view class.
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
     * Getter for input list template.
     * @abstract
     * @returns {string} Input list template as a string.
     */
    get template() {
        return createItemsListTemplate({parentId: this.#parentId,isNested: this.#isNested});
    }

    get parentId() {
        return this.#parentId;
    }
}