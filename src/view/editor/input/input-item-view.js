import AbstractStatefulView from "../../../framework/view/abstract-stateful-view.js";

function createInputItemTemplate({id, key, value, inputValueDisabled, parentId}) {
    return (
        `
        <li data-id=${id} data-parent-id=${parentId}>
            <div class="input-item">
                <input type="text" class="input-item__field input-item__field_key" placeholder="Key" value='${key}'/}>
                <input type="text" class="input-item__field input-item__field_value" placeholder="${inputValueDisabled ? 'disabled' : 'Value'}" value='${inputValueDisabled ? 'disabled' : value}' ${inputValueDisabled ? 'disabled' : ''}/>
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

    constructor({item, parentId}) {
        super();
        this._state = this.#parseObjectToState(item, parentId)
    }

    #parseObjectToState(item, parentId) {
        const state = {id: item.id, key: item.key, value: item.value, parentId: parentId};

        if (Array.isArray(state.value)) {
            state.inputValueDisabled = true;
            state.value = '';
        } else {
            state.inputValueDisabled = false;
        }
        
        return state;
    }

    parseStateToObject() {
        const { id, key, value, parentId } = this._state

        return { id, key, value, parentId };
    }

    /**
     * Getter for input item template.
     * @abstract
     * @returns {string} Input item template as a string.
     */
    get template() {
        return createInputItemTemplate({...this._state});
    }

    get id() {
        return this._state.id;
    }

    get parentId() {
        return this._state.parentId;
    }

    _restoreHandlers() {
        return;
    }
}