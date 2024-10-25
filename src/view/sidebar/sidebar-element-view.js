import AbstractView from "../../framework/view/abstract-view";

function createSidebarElementTemplate({sidebarElementText}) {
    return (
        `
        <li class="sidebar__menu-item"><a href="#">${sidebarElementText}</a></li>
        `
    );
}

/**
 * Sidebar element view class.
 */
export default class SidebarElementView extends AbstractView {
    #sidebarElementText = null;

    constructor({sidebarElementText}) {
        super();
        this.#sidebarElementText = sidebarElementText;

    }

    /**
     * Getter for sidebar element template.
     * @abstract
     * @returns {string} Sidebar element template as a string.
     */
    get template() {
        return createSidebarElementTemplate({sidebarElementText: this.#sidebarElementText});
    }
}