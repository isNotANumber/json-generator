import AbstractView from "../../framework/view/abstract-view";

function createNotificationTemplate({message}) {
    return (
        `
        <div id="notification" class="notification">${message}</div>
        `
    );
}

/**
 * Notification view class.
 */
export default class NotificationView extends AbstractView {
    #message = null;

    constructor({message}) {
        super();
        this.#message = message;
    }

    /**
     * Getter for modal template.
     * @abstract
     * @returns {string} Notification template as a string.
     */
    get template() {
        return createNotificationTemplate({message: this.#message});
    }
}