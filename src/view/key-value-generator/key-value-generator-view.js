import AbstractView from "../../framework/view/abstract-view.js";

function createKeyValueGeneratorTemplate() {
    return (
        `
        <ul class="key-value-list" id="key-value-list">
            <li>
                <div class="key-value-generator">
                    <input type="text" class="key-value-generator__input" placeholder="Key"/>
                    <input type="text" class="key-value-generator__input" placeholder="Value"/>
                    <div class="generator__buttons-container"></div>
                </div>
                <ul class="key-value-list key-value-list--nested"></ul>
            </li>
        </ul>
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