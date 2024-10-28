import AbstractView from "../../framework/view/abstract-view";

function createModalTemplate() {
    return (
        `
        <div id="modal" class="modal">
            <div class="modal__content">
                <h2>Warning</h2>
                <p id="modal-message">Are you sure you want to perform this action?</p>
                <div class="modal__content__buttons">
                    <button class="button button--red modal-btn--confirm">Confirm</button>
                    <button class="button modal-btn--cancel">Cancel</button>
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