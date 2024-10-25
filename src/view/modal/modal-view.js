import AbstractView from "../../framework/view/abstract-view";
import ButtonView from "../button/button-view.js";

function createModalTemplate() {
    const buttonsTemplate = [
        new ButtonView({modifiers: ['button--red'], buttonText: 'Yes'}).template,
        new ButtonView({modifiers: [], buttonText: 'No'}).template
    ]

    return (
        `
        <div id="modal" class="modal">
            <div class="modal__content">
                <h2>Warning</h2>
                <p id="modal-message">Are you sure you want to perform this action?</p>
                <div class="modal__content__buttons">
                    ${buttonsTemplate.join(' ')}
                </div>
            </div>
        </div>
        `
    );
}

/**
 * Modal view class.
 */
export default class ModalView extends AbstractView {

    /**
     * Getter for modal template.
     * @abstract
     * @returns {string} Modal template as a string.
     */
    get template() {
        return createModalTemplate();
    }
}