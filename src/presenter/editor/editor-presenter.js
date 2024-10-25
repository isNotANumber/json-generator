import { render } from "../../framework/render";
import EditorInputView from "../../view/editor/editor-input-view";
import EditorOutputView from "../../view/editor/editor-output-view";
import EditorView from "../../view/editor/editor-view";
import KeyValueListView from "../../view/key-value-generator/key-value-list-view.js";
import KeyValueGeneratorView from "../../view/key-value-generator/key-value-generator-view.js";

export default class EditorPresenter {
    #container = null;

    constructor({container}) {
        this.#container = container;
    }

    init() {
        const editor = new EditorView();
        const editorInput = new EditorInputView();
        const editorOutput = new EditorOutputView();
        const generatorList = new KeyValueListView();
        const keyValueGeneratorView = new KeyValueGeneratorView();

        render(editor, this.#container);
        render(editorInput, editor.element);
        render(editorOutput, editor.element);
        render(generatorList, editorInput.element);
        render(keyValueGeneratorView, generatorList.element);
    }
}