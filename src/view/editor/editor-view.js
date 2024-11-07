import AbstractView from "../../framework/view/abstract-view";

function createEditorInputTemplate() {
    return (
        `
        <div class="editor__pane editor__pane_input">
            <h2>Propopties (key:value)</h2>
        </div>
        `
    );
}

function createEditorOutputTemplate() {
    return (
        `
        <div class="editor__pane editor__pane_output">
            <h2>JSON</h2>
            <pre id="json-output">{}</pre>
            </div>
          </div>
        `
    );
}

function createEditorTemplate() {
    const editorInputTemplate = createEditorInputTemplate();
    const editorOutputTemplate = createEditorOutputTemplate();

    return (
        `
        <div class="editor">
            ${editorInputTemplate}
            ${editorOutputTemplate}
        </div>
        `
    );
}

/**
 * Editor view class.
 */
export default class EditorView extends AbstractView {

    /**
     * Getter for editor template.
     * @abstract
     * @returns {string} Editor template as a string.
     */
    get template() {
        return createEditorTemplate();
    }
}