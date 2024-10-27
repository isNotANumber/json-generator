import AbstractView from "../../framework/view/abstract-view.js";

function createKeyValueGeneratorTemplate() {
    return (
        `
        <li>
            <div class="key-value-generator">
                <input type="text" class="key-value-generator__input" placeholder="Key"/>
                <input type="text" class="key-value-generator__input" placeholder="Value"/>
                <div class="generator__buttons-container"></div>
            </div>
            <ul class="key-value-generator__nested"></ul>
        </li>
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