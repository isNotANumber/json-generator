import { render, RenderPosition } from "../../framework/render.js";
import SidebarView from "../../view/sidebar/sidebar-view.js";

export default class SidebarPresenter {
    #container = null;

    constructor({container}) {
        this.#container = container;
    }

    init() {
        const sidebar = new SidebarView();

        render(sidebar, this.#container, RenderPosition.AFTERBEGIN);
        // this.#renderSidebarElements(sidebar, SIDEBAR_ELEMENTS);
    }
}