import AbstractView from "../../framework/view/abstract-view";

function creatEditorPaneTemplate() {
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
        <div class="editor__pane">
            <h2>JSON</h2>
            <pre id="json-output">{}</pre>
            <div class="editor__pane__copy-button">
                <button>Copy</button>
        </div>
        `
    );
}

/**
 * Editor pane view class.
 */
export default class EditorPaneView extends AbstractView {

    /**
     * Getter for pane editor template.
     * @abstract
     * @returns {string} Editor pane template as a string.
     */
    get template() {
        return creatEditorPaneTemplate();
    }
}