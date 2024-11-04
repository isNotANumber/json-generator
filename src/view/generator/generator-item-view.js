import AbstractStatefulView from "../../framework/view/abstract-stateful-view.js";

function createGeneratorItemTemplate({id, key, value, parentId}) {
    return (
        `
        <li data-id=${id} data-parent-id=${parentId}>
            <div class="generator-item">
                <input type="text" class="generator-item__input generator-item__input-key" placeholder="Key" value='${key}'/}>
                <input type="text" class="generator-item__input generator-item__input-value" placeholder="Value" value='${value}'/>
                <button class="button button--small gnrt-btn--append">
                    <i class="fas fa-plus"></i>
                  </button>
                <button class="button button--small button--red gnrt-btn--remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <ul class="generator-input-list generator-input-list--nested"></ul>
        </li>
        `
    );
}

/**
 * Generator item view class.
 */
export default class GeneratorItemView extends AbstractStatefulView {
    #id = null;
    #parentId = null;
    #handleItemInput = null;

    constructor({id, key, value, parentId, onInput}) {
        super();
        this._setState({key: key, value: value})
        this.#id = id
        this.#parentId = parentId
        this.#handleItemInput = onInput;

        this.element.addEventListener('change', this.#handleItemInput);
    }

    /**
     * Getter for generator item template.
     * @abstract
     * @returns {string} Generator item template as a string.
     */
    get template() {
        return createGeneratorItemTemplate({id: this.#id, key: this._state.key, value: this._state.value, parentId: this.#parentId});
    }

    _restoreHandlers() {
        this.element.addEventListener('change', this.#handleItemInput);
    }

    convertToObject() {
        const {id, parentId} = this.element.dataset;
        const {key, value} = this._state;

        return {id, parentId, key, value};
    }
}