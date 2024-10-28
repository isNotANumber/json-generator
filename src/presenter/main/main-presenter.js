import { render, remove } from '../../framework/render.js';
import MainContainerView from '../../view/main/main-container-view.js';
import ToolbarPresenter from '../toolbar/toolbar-presenter.js';
import SidebarPresenter from '../sidebar/sidebar-presenter.js';
import EditorPresenter from '../editor/editor-presenter.js';
import ModalPresenter from '../modal/modal-presenter.js';
import NotificationPresenter from '../notification/notification-presenter.js';

export default class MainPresenter {
  #container = null;

  #toolbarPresenter = null;
  #sidebarPresenter = null;
  #editorPresenter = null;
  #modalPresenter = null;
  #notificationPresenter = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    const mainContainer = new MainContainerView();
    const mainContentElement =
      mainContainer.element.querySelector('.main-content');

    render(mainContainer, this.#container);

    this.#renderSidebar(mainContainer.element);
    this.#renderToolbar(mainContentElement);
    this.#renderEditor(mainContentElement);
  }

  #renderSidebar(container) {
    this.#sidebarPresenter = new SidebarPresenter({
      container: container,
    });

    this.#sidebarPresenter.init();
  }

  #renderToolbar(container) {
    this.#toolbarPresenter = new ToolbarPresenter({
      container: container,
      onApplyClick: this.#handleTlbApplyClick,
      onClearClick: this.#handleTlbClearClick,
      onSaveClick: this.#handleTlbSaveClick,
      onCopyClick: this.#handleTlbCopyClick,
    });

    this.#toolbarPresenter.init();
  }

  #handleTlbApplyClick = () => {
    console.log('Apply clicked!');
  };

  #handleTlbClearClick = () => {
    this.#showModal(this.#container);
  };

  #handleTlbSaveClick = () => {
    console.log('Save clicked!');
  };

  #handleTlbCopyClick = () => {
    console.log('Copy clicked!');
  };

  #renderEditor(container) {
    this.#editorPresenter = new EditorPresenter({
      container: container,
    });

    this.#editorPresenter.init();
  }

  #showModal(container) {
    this.#modalPresenter = new ModalPresenter({ container: container, onApplyClick: this.#handleModalApplyClick, onCancelClick: this.#handleModalCancelClick });

    this.#modalPresenter.init();
  }

  #handleModalApplyClick = () => {
    this.#editorPresenter.reset();
    this.#modalPresenter.destroy();

    this.#showNotification(this.#container, 'Editor reseted!');
  };

  #handleModalCancelClick = () => {
    this.#modalPresenter.destroy();

    this.#showNotification(this.#container, 'Editor reset cancelled!');
  };

  #showNotification(container, message) {
    this.#notificationPresenter = new NotificationPresenter({
      container: container,
      message: message,
    });

    this.#notificationPresenter.init();

    setTimeout(() => {
      this.#notificationPresenter.destroy();
    }, 3000);
  }
}
