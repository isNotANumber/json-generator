import AbstractStatefulView from "../../../../framework/view/abstract-stateful-view.js";

function createInputItemStringTemplate({id, parentId, value}) {
    return (
        `
        <li data-id="${id}" data-parent-id=${parentId} class="input-item input-item__string">
            <div class="input-item__content">
            <span class="type-label">String</span>
            <input type="text" class="input-item__field input-item__field_value" placeholder="Value" value='${value}' />
            <div class="input-item__controls">
                <button class="button button_small button_red input-item__button_remove">
                    <i class="icon fas fa-trash"></i>
                </button>
            </div>
            </div>
        </li>
        `
    )
}

export default class StringItemView extends AbstractStatefulView {

    constructor({id, parentId, value}) {
        super();
        this._state = {id: id, parentId: parentId, value: value};
    }

    /**
     * Getter for input item template.
     * @abstract
     * @returns {string} Input item template as a string.
     */
    get template() {
        return createInputItemStringTemplate({...this._state});
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