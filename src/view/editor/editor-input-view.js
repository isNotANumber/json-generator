import AbstractView from "../../framework/view/abstract-view";

function createEditorInputTemplate() {
    return (
        `
        <div class="editor__pane">
            <h2>Propopties (key:value)</h2>
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