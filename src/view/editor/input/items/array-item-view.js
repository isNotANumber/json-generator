import AbstractStatefulView from "../../../../framework/view/abstract-stateful-view.js";

function createInputItemArrayTemplate({id, parentId, rootObjId, selectedType}) {
    return (
        `
        <li data-id="${id}" data-parent-id=${parentId} data-root-obj-id=${rootObjId} class="input-item input-item__array">
            <div class="input-item__content">
                <span class="type-label">Array</span>
                <select class="input-item__value_type">
                    <option value="string" ${selectedType === 'string' ? 'selected' : ''}>String</option>
                    <option value="object" ${selectedType === 'object' ? 'selected' : ''}>Object</option>
                </select>
                <div class="input-item__controls">
                <button class="button button_small input-item__button_append">
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
    );
}


export default class ArrayItemView extends AbstractStatefulView {

    constructor({id, parentId = null, rootObjId = null, selectedType = 'string'}) {
        super();
        this._state = {id: id, parentId: parentId, rootObjId: rootObjId, selectedType: selectedType};
    }

    /**
     * Getter for input item template.
     * @abstract
     * @returns {string} Input item template as a string.
     */
    get template() {
        return createInputItemArrayTemplate({...this._state});
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
        return { value: [] }
    }

    _restoreHandlers() {
        return;
    }
}