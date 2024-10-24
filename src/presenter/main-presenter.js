import { render } from "../framework/render";
import MainContainerView from "../view/main/main-container-view.js";
import SidebarView from "../view/sidebar/sidebar-view.js";
import MainContentView from "../view/main/main-content-view.js";
import EditorView from "../view/editor/editor-view.js";
import ModalView from "../view/modal/modal-view.js";
import NotificationView from "../view/notification/notification-view.js"
import ToolbarPresenter from "./toolbar/toolbar-presenter.js";

export default class MainPresenter {
    #container = null;

    constructor({container}) {
        this.#container = container;
    }

    init() {
        const mainContainer = new MainContainerView();
        const mainContent = new MainContentView();
        const toolbarPresenter = new ToolbarPresenter({container: mainContent.element});

        render(mainContainer, this.#container);
        render(new SidebarView(), mainContainer.element);
        render(mainContent, mainContainer.element);

        toolbarPresenter.init();
        render(new EditorView(), mainContent.element);
        render(new ModalView(), this.#container);
        render(new NotificationView(), this.#container);
    }
}