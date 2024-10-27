import { render } from '../../framework/render';
import EditorOutputView from '../../view/editor/editor-output-view';
import ButtonView from '../../view/button/button-view.js';

export default class EditorOutputPresenter {
  #container = null;

  #editorOutput = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    this.#renderEditorOutput(this.#container);
  }

  #renderEditorOutput(container) {
    this.#editorOutput = new EditorOutputView();

    render(this.#editorOutput, container);

    const copyButtonContainer = this.#editorOutput.element.querySelector(
      '.editor__output-button-container'
    );
    this.#renderButtons(copyButtonContainer);
  }

  #renderButtons(container) {
    const copyButton = new ButtonView({
      modifiers: ['button--small'],
      buttonContent: 'Copy',
      onClick: this.#handleOutputCopyClick,
    });

    render(copyButton, container);
  }

  #handleOutputCopyClick() {
    console.log('Copy button clicked!');
  }
}
