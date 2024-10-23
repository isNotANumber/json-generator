import AbstractView from "../../framework/view/abstract-view";

function createSidebarTemplate() {
    return (
        `
        <div class="sidebar">
            <div class="sidebar__title">Templates</div>
            <ul class="sidebar__menu">
                <li class="sidebar__menu-item"><a href="#">JSON</a></li>
                <li class="sidebar__menu-item"><a href="#">HTML</a></li>
            </ul>
        </div>
        `
    );
}

/**
 * Sidebar view class.
 */
export default class SidebarView extends AbstractView {
    /**
     * Getter for sidebar template.
     * @abstract
     * @returns {string} Sidebar template as a string.
     */
    get template() {
        return createSidebarTemplate();
    }
}