import { render, remove } from '../../framework/render.js';
import NotificationView from '../../view/notification/notification-view.js';

export default class NotificationPresenter {
  #container = null;
  #notification = null;
  #message = null;

  constructor({ container, message }) {
    this.#container = container;
    this.#message = message;
    this.#notification = new NotificationView({ message: this.#message });
  }

  init() {
    render(this.#notification, this.#container);
  }

  destroy() {
    remove(this.#notification);
  }
}
