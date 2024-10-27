import { render } from "../../framework/render.js";
import ButtonView from "../../view/button/button-view.js";
import ToolbarView from "../../view/toolbar/toolbar-view.js"
import { TOOLBAR_DESCRIPTION } from "./toolbar-buttons-description.js";

export default class ToolbarPresenter {
    #container = null;

    constructor({container}) {
        this.#container = container;
    }

    init() {
        const toolbar = new ToolbarView();

        render(toolbar, this.#container);
        this.#renderButtons(toolbar, TOOLBAR_DESCRIPTION);
    }

    #renderButton(button, container) {
        render(button, container);
    }

    #renderButtons(toolbar, toolbarDescription) {
        for (const side of Object.values(toolbarDescription)) {
            const buttonsContainer = toolbar.element.querySelector(side.selector);

            for (const button of Object.values(side.buttons)) {
                const currentButton = new ButtonView({modifiers: button.modifiers, buttonContent: button.buttonContent});
                this.#renderButton(currentButton, buttonsContainer);
            }
        }
    }
}