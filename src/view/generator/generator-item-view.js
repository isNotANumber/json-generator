import AbstractView from "../../framework/view/abstract-view.js";

function createGeneratorItemTemplate({id, key, value}) {
    return (
        `
        <li>
            <div data-id=${id} class="generator-item">
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
export default class GeneratorItemView extends AbstractView {
    #id = null;
    #key = null;
    #value = null;

    constructor({id, key, value, child}) {
        super();
        this.#id = id;
        this.#key = key;
        this.#value = value;
    }

    /**
     * Getter for generator item template.
     * @abstract
     * @returns {string} Generator item template as a string.
     */
    get template() {
        return createGeneratorItemTemplate({id: this.#id, key: this.#key, value: this.#value});
    }
}