import { render } from '../../framework/render.js';
import ToolbarView from '../../view/toolbar/toolbar-view.js';

export default class ToolbarPresenter {
  #container = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    const toolbar = new ToolbarView({
      onApplyClick: this.#handleApplyClick,
      onClearClick: this.#handleClearClick,
      onSaveClick: this.#handleSaveClick,
      onCopyClick: this.#handleCopyClick,
    });

    render(toolbar, this.#container);
  }

  #handleApplyClick = () => {
    console.log('Apply clicked!');
  };

  #handleClearClick = () => {
    console.log('Clear clicked!');
  };

  #handleSaveClick = () => {
    console.log('Save clicked!');
  };

  #handleCopyClick = () => {
    console.log('Copy clicked!');
  };
}
