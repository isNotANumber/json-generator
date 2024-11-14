import AbstractStatefulView from "../../../framework/view/abstract-stateful-view.js";

function createInputInitialTemplate({selectedType}) {
    return (
        `
        <div class="input-content">
            <div data-id='0' class="input-item input-item__initial">
                <div class="input-item__content">
                    <span class="type-label">Add Object</span>
                    <div class="input-item__controls">
                    <button class="button button_small input-item__button_append">
                        <i class="icon fas fa-plus"></i>
                    </button>
                    </div>
                </div>
            </div>

            <ul class="input-list input-content__container"></ul>
        </div>
        `
    )
}

/**
 * Input list view class.
 */
export default class InputInitialView extends AbstractStatefulView {
    #handleControlClick = null;
    #handleItemFieldChange = null;

    constructor({selectedType = 'string', onControlClick, onItemFieldChange}) {
        super();

        this._state = {selectedType: selectedType};

        this.#handleControlClick = onControlClick;
        this.#handleItemFieldChange = onItemFieldChange;

        this.element.addEventListener('click', this.#handleControlClick);
        this.element.addEventListener('change', this.#handleItemFieldChange)
    }

    /**
     * Getter for input list template.
     * @abstract
     * @returns {string} Input list template as a string.
     */
    get template() {
        return createInputInitialTemplate({...this._state});
    }

    get childrenContainer() {
        return this.element.querySelector('.input-content__container');
    }
}