import { render } from "../../framework/render.js";
import NotificationView from "../../view/notification/notification-view.js";

export default class NotificationPresenter {
    #container = null;

    constructor({container}) {
        this.#container = container;
    }

    init() {
        render(new NotificationView(), this.#container);
    }
}