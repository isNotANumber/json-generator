import AbstractStatefulView from "../../framework/view/abstract-stateful-view.js";

function createInputItemTemplate({id, key, value, parentId, inputValueDisabled}) {
    return (
        `
        <li data-id=${id} data-parent-id=${parentId}>
            <div class="input-item">
                <input type="text" class="input-item__field input-item__field_key" placeholder="Key" value='${key}'/}>
                <input type="text" class="input-item__field input-item__field_value" placeholder="${inputValueDisabled ? 'disabled' : 'Value'}" value='${inputValueDisabled ? '' : value}' ${inputValueDisabled ? 'disabled' : ''}/>
                <button class="button button_small input-item__button_append">
                    <i class="icon fas fa-plus"></i>
                  </button>
                <button class="button button_small button_red input-item__button_remove">
                    <i class="icon fas fa-trash"></i>
                </button>
            </div>
        </li>
        `
    );
}

/**
 * Input item view class.
 */
export default class InputItemView extends AbstractStatefulView {
    #id = null;
    #parentId = null;

    constructor({id, key, value, parentId, inputValueDisabled = false}) {
        super();
        this._setState({key: key, value: value, inputValueDisabled})
        this.#id = id
        this.#parentId = parentId
    }

    /**
     * Getter for input item template.
     * @abstract
     * @returns {string} Input item template as a string.
     */
    get template() {
        return createInputItemTemplate({id: this.#id, key: this._state.key, value: this._state.value, parentId: this.#parentId, inputValueDisabled: this._state.inputValueDisabled});
    }

    get id() {
        return this.#id;
    }

    get parentId() {
        return this.#parentId;
    }

    _restoreHandlers() {
        return;
    }
}