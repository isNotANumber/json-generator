import AbstractView from "../../framework/view/abstract-view";

function createNotificationTemplate() {
    return (
        `
        <div id="notification" class="notification">JSON copied to clipboard</div>
        `
    );
}

/**
 * Notification view class.
 */
export default class NotificationView extends AbstractView {

    /**
     * Getter for modal template.
     * @abstract
     * @returns {string} Notification template as a string.
     */
    get template() {
        return createNotificationTemplate();
    }
}