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

        render(mainContainer, this.#container);
        render(new SidebarView(), mainContainer.element);
        render(mainContent, mainContainer.element);
        render(new ToolbarView(), mainContent.element);
        render(new EditorView(), mainContent.element);
        render(new ModalView(), this.#container);
        render(new NotificationView(), this.#container);
    }
}