import AbstractStatefulView from "../../../../framework/view/abstract-stateful-view.js";

function createInputItemObjectTemplate({id, parentId, key, selectedType, blocked}) {
    return (
        `
        <li data-id="${id}" data-parent-id=${parentId} data-root-obj-id=${id} class="input-item input-item__object">
            <div class="input-item__content">
            <span class="type-label">Object</span>
            <input type="text" class="input-item__field input-item__field_key" placeholder="Key" value='${key}' />
            <select class="input-item__value_type">
                <option value="string" ${selectedType === 'string' ? 'selected' : ''}>String</option>
                <option value="array" ${selectedType === 'array' ? 'selected' : ''}>Array</option>
                <option value="object" ${selectedType === 'object' ? 'selected' : ''}>Object</option>
            </select>
            <div class="input-item__controls">
                <button class="button button_small input-item__button_append" ${blocked ? 'disabled' : ''}>
                    <i class="icon fas fa-plus"></i>
                </button>
                <button class="button button_small button_red input-item__button_remove">
                    <i class="icon fas fa-trash"></i>
                </button>
            </div>
            </div>

            <div class="input-item__chlildren"></div>
        </li>
        `
    )
}

export default class ObjectItemView extends AbstractStatefulView {

    constructor({id, parentId = null, key = 'aaa', selectedType = 'string'}) {
        super();
        this._state = {id: id, parentId: parentId, key: key, selectedType: selectedType, blocked: false};
    }

    /**
     * Getter for input item template.
     * @abstract
     * @returns {string} Input item template as a string.
     */
    get template() {
        return createInputItemObjectTemplate({...this._state});
    }

    get childrenContainer() {
        return this.element.querySelector('.input-item__chlildren');
    }

    get id() {
        return this._state.id;
    }

    get parentId() {
        return this._state.parentId;
    }

    getStateValueAsObject() {
        return { value: this._state.key }
    }

    _restoreHandlers() {
        return;
    }
}