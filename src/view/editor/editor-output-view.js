import AbstractView from "../../framework/view/abstract-view";

function createEditorOutputTemplate() {
    return (
        `
        <div class="editor__pane">
            <h2>JSON</h2>
            <pre id="json-output">{}</pre>
            <div class="editor__pane__copy-button">
              <button>Copy</button>
            </div>
          </div>
        `
    );
}

/**
 * Editor output pane view class.
 */
export default class EditorOutputView extends AbstractView {

    /**
     * Getter for output pane editor template.
     * @abstract
     * @returns {string} Editor output pane template as a string.
     */
    get template() {
        return createEditorOutputTemplate();
    }
}