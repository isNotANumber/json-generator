import { render } from "../../framework/render.js";
import ModalView from "../../view/modal/modal-view.js";

export default class ModalPresenter {
    #container = null;

    constructor({container}) {
        this.#container = container;
    }

    init() {
        render(new ModalView(), this.#container);
    }
}