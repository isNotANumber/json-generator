import AbstractView from "../../framework/view/abstract-view";

function createModalTemplate() {
    return (
        `
        <div class="modal">
            <div class="modal__content">
                <h2 class="modal__title">Warning</h2>
                <p class="modal__message">Are you sure you want to perform this action?</p>
                <div class="modal__buttons">
                    <button class="button button_red modal__button_confirm">Confirm</button>
                    <button class="button modal__button_cancel">Cancel</button>
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
    #handleModalButtonClick = null;

    constructor({ onModalButtonClick }) {
        super();
        this.#handleModalButtonClick = onModalButtonClick;

        this.element.addEventListener('click', this.#handleModalButtonClick);
    }

    /**
     * Getter for modal template.
     * @abstract
     * @returns {string} Modal template as a string.
     */
    get template() {
        return createModalTemplate();
    }
}