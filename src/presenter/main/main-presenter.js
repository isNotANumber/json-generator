import { render } from "../../framework/render.js";
import MainContainerView from "../../view/main/main-container-view.js";
import ModalView from "../../view/modal/modal-view.js";
import NotificationView from "../../view/notification/notification-view.js"
import ToolbarPresenter from "../toolbar/toolbar-presenter.js";
import SidebarPresenter from "../sidebar/sidebar-presenter.js";
import EditorPresenter from "../editor/editor-presenter.js";

export default class MainPresenter {
    #container = null;

    constructor({container}) {
        this.#container = container;
    }

    init() {
        const mainContainer = new MainContainerView();
        const sidebarPresenter = new SidebarPresenter({container: mainContainer.element})

        const mainContentElement = mainContainer.element.querySelector('.main-content');
        const toolbarPresenter = new ToolbarPresenter({container: mainContentElement});
        const editorPresenter = new EditorPresenter({container: mainContentElement})

        render(mainContainer, this.#container);
        sidebarPresenter.init();
        toolbarPresenter.init();
        editorPresenter.init();
        render(new ModalView(), this.#container);
        render(new NotificationView(), this.#container);
    }
}