import { render } from "../../framework/render.js";
import SidebarView from "../../view/sidebar/sidebar-view.js";
import SidebarElementView from "../../view/sidebar/sidebar-element-view.js";
import { SIDEBAR_ELEMENTS } from "./sidebar-elements-description.js";

export default class SidebarPresenter {
    #container = null;

    constructor({container}) {
        this.#container = container;
    }

    init() {
        const sidebar = new SidebarView();

        render(sidebar, this.#container)
        this.#renderSidebarElements(sidebar, SIDEBAR_ELEMENTS);
    }

    #renderSidebarElement(component, container) {
        render(component, container);
    }

    #renderSidebarElements(sidebar, sidebarElementsDescription) {
        const elementsContainer = sidebar.element.querySelector('.sidebar__menu');
        for (const sidebarElement of Object.values(sidebarElementsDescription)) {
            const currentElement = new SidebarElementView({sidebarElementText: sidebarElement.text})
            this.#renderSidebarElement(currentElement, elementsContainer);
        }
    }
}