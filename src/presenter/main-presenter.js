import { render } from "../framework/render";
import MainContainerView from "../view/main/main-container-view.js";
import SidebarView from "../view/sidebar/sidebar-view.js";
import MainContentView from "../view/main/main-content-view.js";
import ToolbarView from "../view/toolbar/toolbar-view.js";
import EditorView from "../view/editor/editor-view.js";
import ModalView from "../view/modal/modal-view.js";
import NotificationView from "../view/notification/notification-view.js"

export default class MainPresenter {
    #container = null;

    constructor({container}) {
        this.#container = container;
    }

    init() {
        const mainContainer = new MainContainerView();
        const mainContent = new MainContentView();
        const toolbar = new ToolbarView();
        const sidebar = new SidebarView();
        const editor = new EditorView();
        const modal = new ModalView();
        const notification = new NotificationView();

        render(mainContainer, this.#container);
        render(sidebar, mainContainer.element);
        render(mainContent, mainContainer.element);
        render(toolbar, mainContent.element);
        render(editor, mainContent.element);
        render(modal, this.#container);
        render(notification, this.#container);
    }
}