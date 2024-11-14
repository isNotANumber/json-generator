import AbstractView from "../../framework/view/abstract-view";

function createSidebarTemplate() {
    return (
        `
        <div class="sidebar">
            <div class="sidebar__title">Templates</div>
            <div class="sidebar__menu">
            <div class="sidebar__item">
                    <input type="radio" id="test0" name="template" value="test0">
                    <label for="test0">Test0</label>
                </div>
                <div class="sidebar__item">
                    <input type="radio" id="test1" name="template" value="test1">
                    <label for="test1">Test1</label>
                </div>
                <div class="sidebar__item">
                    <input type="radio" id="test2" name="template" value="test2">
                    <label for="test2">Test2</label>
                </div>
            </div>
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