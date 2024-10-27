import { render } from "../../framework/render.js";
import ToolbarView from "../../view/toolbar/toolbar-view.js"

export default class ToolbarPresenter {
    #container = null;

    constructor({container}) {
        this.#container = container;
    }

    init() {
        const toolbar = new ToolbarView();

        render(toolbar, this.#container);
    }
}