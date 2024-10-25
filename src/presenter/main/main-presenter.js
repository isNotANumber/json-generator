import { render } from "../../framework/render.js";
import MainContainerView from "../../view/main/main-container-view.js";
import ToolbarPresenter from "../toolbar/toolbar-presenter.js";
import SidebarPresenter from "../sidebar/sidebar-presenter.js";
import EditorPresenter from "../editor/editor-presenter.js";
import ModalPresenter from "../modal/modal-presenter.js";
import NotificationPresenter from "../notification/notification-presenter.js";

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
        const editorPresenter = new EditorPresenter({container: mainContentElement});
        const modalPresenter = new ModalPresenter({container: this.#container});
        const notificationPresenter = new NotificationPresenter({container: this.#container})

        render(mainContainer, this.#container);
        sidebarPresenter.init();
        toolbarPresenter.init();
        editorPresenter.init();
        modalPresenter.init();
        notificationPresenter.init();
    }
}