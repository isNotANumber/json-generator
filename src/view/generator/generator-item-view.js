import AbstractStatefulView from "../../framework/view/abstract-stateful-view.js";

function createGeneratorItemTemplate({id, key, value}) {
    return (
        `
        <li data-id=${id}>
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
    constructor({id, key, value}) {
        super();
        this._setState({id: id, key: key, value: value})
    }

    /**
     * Getter for generator item template.
     * @abstract
     * @returns {string} Generator item template as a string.
     */
    get template() {
        return createGeneratorItemTemplate({id: this._state.id, key: this._state.key, value: this._state.value});
    }
}