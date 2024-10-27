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
    this.#renderModal(this.#container);
    this.#renderNotification(this.#container);
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
    console.log('Clear clicked!');
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

  #renderModal(container) {
    this.#modalPresenter = new ModalPresenter({ container: container });

    this.#modalPresenter.init();
  }

  #renderNotification(container) {
    this.#notificationPresenter = new NotificationPresenter({
      container: container,
    });

    this.#notificationPresenter.init();
  }
}
