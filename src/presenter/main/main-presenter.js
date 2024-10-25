import { render } from "../../framework/render.js";
import MainContainerView from "../../view/main/main-container-view.js";
import MainContentView from "../../view/main/main-content-view.js";
import EditorView from "../../view/editor/editor-view.js";
import ModalView from "../../view/modal/modal-view.js";
import NotificationView from "../../view/notification/notification-view.js"
import ToolbarPresenter from "../toolbar/toolbar-presenter.js";
import SidebarPresenter from "../sidebar/sidebar-presenter.js";

export default class MainPresenter {
    #container = null;

    constructor({container}) {
        this.#container = container;
    }

    init() {
        const mainContainer = new MainContainerView();
        const mainContent = new MainContentView();
        const toolbarPresenter = new ToolbarPresenter({container: mainContent.element});
        const sidebarPresenter = new SidebarPresenter({container: mainContainer.element})

        render(mainContainer, this.#container);
        sidebarPresenter.init();
        render(mainContent, mainContainer.element);

        toolbarPresenter.init();
        render(new EditorView(), mainContent.element);
        render(new ModalView(), this.#container);
        render(new NotificationView(), this.#container);
    }
}