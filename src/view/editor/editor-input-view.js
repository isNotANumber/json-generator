import AbstractView from "../../framework/view/abstract-view";

function createEditorInputTemplate() {
    return (
        `
        <div class="editor__pane">
            <h2>Propopties (key:value)</h2>
            <ul id="key-value-list">
                <li>
                <div class="key-value-generator">
                    <input type="text" class="key-value-generator__input" id="key1" placeholder="Key"/>
                    <input type="text" class="key-value-generator__input" id="value1" placeholder="Value"/>
                    <button class="key-value-generator__button">
                    <i class="fas fa-plus"></i>
                    </button>
                    <button class="key-value-generator__button key-value-generator__delete-button">
                    <i class="fas fa-trash"></i>
                    </button>
                </div>
                <ul class="key-value-generator__nested"></ul>
                </li>
            </ul>
        </div>
        `
    );
}

/**
 * Editor input pane view class.
 */
export default class EditorInputView extends AbstractView {

    /**
     * Getter for input pane editor template.
     * @abstract
     * @returns {string} Editor input pane template as a string.
     */
    get template() {
        return createEditorInputTemplate();
    }
}