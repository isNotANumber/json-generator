import AbstractView from "../../framework/view/abstract-view";

function createKeyValueGeneratorTemplate() {
    return (
        `
        <div class="key-value-generator">
            <input type="text" class="key-value-generator__input" id="key1" placeholder="Key"/>
            <input type="text" class="key-value-generator__input" id="value1" placeholder="Value"/>
            <button class="button button--small">
                <i class="fas fa-plus"></i>
            </button>
            <button class="button button--small button--red">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        `
    );
}

/**
 * KeyValueGenerator view class.
 */
export default class KeyValueGeneratorView extends AbstractView {

    /**
     * Getter for generator template.
     * @abstract
     * @returns {string} Generator template as a string.
     */
    get template() {
        return createKeyValueGeneratorTemplate();
    }
}