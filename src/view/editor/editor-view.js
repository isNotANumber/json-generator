import AbstractView from "../../framework/view/abstract-view";

function createEditorTemplate() {
    return (
        `
        <div class="editor"></div>
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