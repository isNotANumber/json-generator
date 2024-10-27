import AbstractView from "../../framework/view/abstract-view.js";
import ButtonView from "../button/button-view.js";

function createKeyValueGeneratorTemplate() {
    const buttonsTemplate = [
        new ButtonView({modifiers: ['button--small'], buttonContent: '<i class="fas fa-plus"></i>'}).template,
        new ButtonView({modifiers: ['button--small', 'button--red'], buttonContent: '<i class="fas fa-minus"></i>'}).template
    ]

    return (
        `
        <div class="key-value-generator">
            <input type="text" class="key-value-generator__input" id="key1" placeholder="Key"/>
            <input type="text" class="key-value-generator__input" id="value1" placeholder="Value"/>
            ${buttonsTemplate.join(' ')}
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