import { render, remove } from '../../framework/render.js';
import MainContainerView from '../../view/main/main-container-view.js';
import SidebarPresenter from '../sidebar/sidebar-presenter.js';
import EditorPresenter from '../editor/editor-presenter.js';
import ModalView from '../../view/modal/modal-view.js';
import HeaderView from '../../view/header/header-view.js';
import NotificationView from '../../view/notification/notification-view.js';
import ToolbarView from '../../view/toolbar/toolbar-view.js';
import EditorInputModel from '../../model/editor-input-model.js';
import EditorOutputModel from '../../model/editor-output-model.js';

export default class GeneralPresenter {
  #container = null;

  #sidebarPresenter = null;
  #editorPresenter = null;

  #headerComponent = null;
  #mainComponent = null;
  #toolbarComponent = null;
  #modalComponent = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    this.#renderHeader(this.#container);
    this.#renderMain(this.#container);

    const mainContentElement =
      this.#mainComponent.element.querySelector('.main-content');

    // this.#renderSidebar(this.#mainComponent.element);
    this.#renderToolbar(mainContentElement);
    this.#renderEditor(mainContentElement);
  }

  #renderHeader(container) {
    this.#headerComponent = new HeaderView();

    render(this.#headerComponent, container);
  }

  #renderMain(container) {
    this.#mainComponent = new MainContainerView();

    render(this.#mainComponent, container);
  }

  #renderSidebar(container) {
    this.#sidebarPresenter = new SidebarPresenter({
      container: container,
    });

    this.#sidebarPresenter.init();
  }

  #renderToolbar(container) {
    this.#toolbarComponent = new ToolbarView({
      onToolbarButtonClick: this.#handleToolbarButtonClick,
    });

    render(this.#toolbarComponent, container);
  }

  #renderEditor(container) {
    this.#editorPresenter = new EditorPresenter({
      container: container,
      inputModel: new EditorInputModel(),
      outputModel: new EditorOutputModel(),
    });

    this.#editorPresenter.init();
  }

  #showModal(container) {
    this.#modalComponent = new ModalView({
      onModalButtonClick: this.#handleModalButtonClick,
    });

    render(this.#modalComponent, container);
  }

  // TODO: refactor this (remove container)
  #showNotification(message) {
    const notification = new NotificationView({ message: message });

    render(notification, this.#container);

    setTimeout(() => {
      remove(notification);
    }, 3000);
  }

  // TODO: refactor this
  #handleModalButtonClick = (evt) => {
    if (evt.target.classList.contains('modal-btn--confirm')) {
      this.#editorPresenter.reset();
      remove(this.#modalComponent);

      this.#showNotification('Editor reseted!');
    } else if (evt.target.classList.contains('modal-btn--cancel')) {
      remove(this.#modalComponent);
      this.#showNotification('Editor reset cancelled!');
    }
  };

  #handleToolbarButtonClick = (evt) => {
    if (evt.target.classList.contains('tlb-btn--apply')) {
      this.#handleToolbarApplyClick();
    } else if (evt.target.classList.contains('tlb-btn--clear')) {
      this.#handleToolbarClearClick();
    } else if (evt.target.classList.contains('tlb-btn--save')) {
      this.#handleToolbarSaveClick();
    } else if (evt.target.classList.contains('tlb-btn--copy')) {
      this.#handleToolbarCopyClick();
    }
  };

  #handleToolbarApplyClick = () => {
    this.#editorPresenter.apply();
    this.#showNotification('JSON rendered!');
  };

  #handleToolbarClearClick = () => {
    this.#showModal(this.#container);
  };

  #handleToolbarSaveClick = () => {
    const jsonOutput = document.getElementById('json-output').textContent;
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  #handleToolbarCopyClick = () => {
    const jsonOutput = document.getElementById('json-output').textContent;
    navigator.clipboard
      .writeText(jsonOutput)
      .then(() => {
        this.#showNotification('JSON copied to clipboard');
      })
      .catch((err) => {
        this.#showNotification('Failed to copy JSON');
      });
  };
}
