import { render } from "../../framework/render";
import EditorInputView from "../../view/editor/editor-input-view";
import EditorOutputView from "../../view/editor/editor-output-view";
import EditorView from "../../view/editor/editor-view";

export default class EditorPresenter {
    #container = null;

    constructor({container}) {
        this.#container = container;
    }

    init() {
        const editor = new EditorView();
        const editorInput = new EditorInputView();
        const editorOutput = new EditorOutputView();

        render(editor, this.#container);
        render(editorInput, editor.element);
        render(editorOutput, editor.element);
    }
}