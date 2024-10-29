import { render, remove } from '../../framework/render.js';
import MainContainerView from '../../view/main/main-container-view.js';
import SidebarPresenter from '../sidebar/sidebar-presenter.js';
import EditorPresenter from '../editor/editor-presenter.js';
import ModalView from '../../view/modal/modal-view.js';
import HeaderView from '../../view/header/header-view.js';
import NotificationView from '../../view/notification/notification-view.js';
import ToolbarView from '../../view/toolbar/toolbar-view.js';

export default class MainPresenter {
  #container = null;

  #sidebarPresenter = null;
  #editorPresenter = null;

  #headerComponent = null;
  #toolbarComponent = null;
  #modalComponent = null;
  #notificationComponent = null;

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    const mainContainer = new MainContainerView();
    const mainContentElement =
      mainContainer.element.querySelector('.main-content');

    this.#renderHeader(this.#container);
    render(mainContainer, this.#container);

    this.#renderSidebar(mainContainer.element);
    this.#renderToolbar(mainContentElement);
    this.#renderEditor(mainContentElement);
  }

  #renderHeader(container) {
    this.#headerComponent = new HeaderView();

    render(this.#headerComponent, container);
  }

  #renderSidebar(container) {
    this.#sidebarPresenter = new SidebarPresenter({
      container: container,
    });

    this.#sidebarPresenter.init();
  }

  #renderToolbar(container) {
    this.#toolbarComponent = new ToolbarView({onToolbarButtonClick: this.#handleToolbarButtonClick})

    render(this.#toolbarComponent, container);
  }

  #handleToolbarButtonClick = (evt) => {
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
    this.#modalComponent = new ModalView({
      onModalButtonClick: this.#handleModalButtonClick,
    });

    render(this.#modalComponent, container);
  }

  // TODO: refactor this
  #handleModalButtonClick = (evt) => {
    if (evt.target.classList.contains('modal-btn--confirm')) {
      this.#editorPresenter.reset();
      remove(this.#modalComponent);

      this.#showNotification(this.#container, 'Editor reseted!');
    } else if (evt.target.classList.contains('modal-btn--cancel')) {
      remove(this.#modalComponent);
      this.#showNotification(this.#container, 'Editor reset cancelled!');
    }
  };

  #showNotification(container, message) {
    this.#notificationComponent = new NotificationView({ message: message });

    render(this.#notificationComponent, container);

    setTimeout(() => {
      remove(this.#notificationComponent);
    }, 3000);
  }
}
