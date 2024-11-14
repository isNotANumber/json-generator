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
  /**
   * @private
   * @type {HTMLElement|null}
   */
  #container = null;

  /**
   * @private
   * @type {SidebarPresenter|null}
   */
  #sidebarPresenter = null;

  /**
   * @private
   * @type {EditorPresenter|null}
   */
  #editorPresenter = null;

  /**
   * @private
   * @type {HeaderView|null}
   */
  #headerComponent = null;

  /**
   * @private
   * @type {MainContainerView|null}
   */
  #mainComponent = null;

  /**
   * @private
   * @type {ToolbarView|null}
   */
  #toolbarComponent = null;

  /**
   * @private
   * @type {ModalView|null}
   */
  #modalComponent = null;

  /**
   * Initializes the presenter with the given container.
   * @param {Object} params - The parameters for initializing the presenter.
   * @param {HTMLElement} params.container - The container element for the application.
   */
  constructor({ container }) {
    this.#container = container;
  }

  /**
   * Initializes the application by rendering the header, main container,
   * toolbar, and editor.
   * @returns {void}
   */
  init() {
    this.#renderHeader(this.#container);
    this.#renderMain(this.#container);

    const mainContentElement =
      this.#mainComponent.element.querySelector('.main-content');

    this.#renderSidebar(this.#mainComponent.element);
    this.#renderToolbar(mainContentElement);
    this.#renderEditor(mainContentElement);
  }

  /**
   * Renders the header component.
   * @param {HTMLElement} container - The container to render the header.
   * @returns {void}
   * @private
   */
  #renderHeader(container) {
    this.#headerComponent = new HeaderView();

    render(this.#headerComponent, container);
  }

  /**
   * Renders the main component.
   * @param {HTMLElement} container - The container to render the main component.
   * @returns {void}
   * @private
   */
  #renderMain(container) {
    this.#mainComponent = new MainContainerView();

    render(this.#mainComponent, container);
  }

  /**
   * Renders the sidebar component.
   * @param {HTMLElement} container - The container to render the sidebar.
   * @returns {void}
   * @private
   */
  #renderSidebar(container) {
    this.#sidebarPresenter = new SidebarPresenter({
      container: container,
    });

    this.#sidebarPresenter.init();
  }

  /**
   * Renders the toolbar component.
   * @param {HTMLElement} container - The container to render the toolbar.
   * @returns {void}
   * @private
   */
  #renderToolbar(container) {
    this.#toolbarComponent = new ToolbarView({
      onToolbarButtonClick: this.#handleToolbarButtonClick,
    });

    render(this.#toolbarComponent, container);
  }

  /**
   * Renders the editor component.
   * @param {HTMLElement} container - The container to render the editor.
   * @returns {void}
   * @private
   */
  #renderEditor(container) {
    this.#editorPresenter = new EditorPresenter({
      container: container,
      inputModel: new EditorInputModel(),
      outputModel: new EditorOutputModel(),
    });

    this.#editorPresenter.init();
  }

  /**
   * Displays a modal view for user confirmation actions.
   * @returns {void}
   * @private
   */
  #showModal() {
    this.#modalComponent = new ModalView({
      onModalButtonClick: this.#handleModalButtonClick,
    });

    render(this.#modalComponent, this.#container);
  }

  /**
   * Displays a notification message for a specified duration.
   * @param {string} message - The message to display in the notification.
   * @returns {void}
   * @private
   */
  #showNotification(message) {
    const notification = new NotificationView({ message: message });

    render(notification, this.#container);

    setTimeout(() => {
      remove(notification);
    }, 3000);
  }

  // TODO: refactor this
  /**
   * Handles button clicks in the modal component.
   * @param {Event} evt - The event object triggered by the button click.
   * @returns {void}
   * @private
   */
  #handleModalButtonClick = (evt) => {
    if (evt.target.classList.contains('modal__button_confirm')) {
      this.#editorPresenter.reset();
      remove(this.#modalComponent);

      this.#showNotification('Editor reseted!');
    } else if (evt.target.classList.contains('modal__button_cancel')) {
      remove(this.#modalComponent);
      this.#showNotification('Editor reset cancelled!');
    }
  };

  /**
   * Handles button clicks in the toolbar component.
   * @param {Event} evt - The event object triggered by the button click.
   * @returns {void}
   * @private
   */
  #handleToolbarButtonClick = (evt) => {
    if (evt.target.classList.contains('toolbar__button_apply')) {
      this.#handleToolbarApplyClick();
    } else if (evt.target.classList.contains('toolbar__button_clear')) {
      this.#handleToolbarClearClick();
    } else if (evt.target.classList.contains('toolbar__button_save')) {
      this.#handleToolbarSaveClick();
    } else if (evt.target.classList.contains('toolbar__button_copy')) {
      this.#handleToolbarCopyClick();
    }
  };

  /**
   * Handles the apply action from the toolbar.
   * @returns {void}
   * @private
   */
  #handleToolbarApplyClick = () => {
    this.#editorPresenter.apply();
    this.#showNotification('JSON rendered!');
  };

  /**
   * Handles the clear action from the toolbar, prompting a modal for confirmation.
   * @returns {void}
   * @private
   */
  #handleToolbarClearClick = () => {
    this.#showModal();
  };

  /**
   * Handles the save action from the toolbar by downloading the JSON output.
   * @returns {void}
   * @private
   */
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

  /**
   * Handles the copy action from the toolbar, copying the JSON output to the clipboard.
   * @returns {void}
   * @private
   */
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
