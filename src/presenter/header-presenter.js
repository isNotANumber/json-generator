import { render } from "../framework/render";
import HeaderView from "../view/header/header-view.js";

export default class HeaderPresenter {
    #container = null;

    constructor({container}) {
        this.#container = container;
    }

    init() {
        render(new HeaderView(), this.#container);
    }
}