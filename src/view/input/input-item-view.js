import AbstractStatefulView from "../../framework/view/abstract-stateful-view.js";

function createInputItemTemplate({id, key, value, parentId}) {
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
        </li>
        `
    );
}

/**
 * Generator item view class.
 */
export default class InputItemView extends AbstractStatefulView {
    #id = null;
    #parentId = null;

    constructor({id, key, value, parentId}) {
        super();
        this._setState({key: key, value: value})
        this.#id = id
        this.#parentId = parentId
    }

    /**
     * Getter for generator item template.
     * @abstract
     * @returns {string} Generator item template as a string.
     */
    get template() {
        return createInputItemTemplate({id: this.#id, key: this._state.key, value: this._state.value, parentId: this.#parentId});
    }

    _restoreHandlers() {
        return;
    }
}