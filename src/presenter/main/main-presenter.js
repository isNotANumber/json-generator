import { render } from '../../framework/render.js';
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
      onToolbarButtonClick: this.#handleToolbarButtonsClick
    });

    this.#toolbarPresenter.init();
  }

  #handleToolbarButtonsClick = (evt) => {
    if (evt.target.classList.contains('tlb-btn--clear')) {
      this.#showModal(this.#container);
    }
  };

  #renderEditor(container) {
    this.#editorPresenter = new EditorPresenter({
      container: container,
    });

    this.#editorPresenter.init();
  }

  #showModal(container) {
    this.#modalPresenter = new ModalPresenter({ container: container, onModalButtonClick: this.#handleModalButtonClick });

    this.#modalPresenter.init();
  }

  #handleModalButtonClick = (evt) => {
    if (evt.target.classList.contains('modal-btn--confirm')) {
      this.#editorPresenter.reset();
      this.#modalPresenter.destroy();

      this.#showNotification(this.#container, 'Editor reseted!');
    } else if (evt.target.classList.contains('modal-btn--cancel')) {
        this.#modalPresenter.destroy();
        this.#showNotification(this.#container, 'Editor reset cancelled!');
    }
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
