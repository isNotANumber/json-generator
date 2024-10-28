import AbstractView from "../../framework/view/abstract-view.js";

function createGeneratorItemTemplate() {
    return (
        `
        <li>
            <div class="generator-item">
                <input type="text" class="generator-item__input" placeholder="Key"/>
                <input type="text" class="generator-item__input" placeholder="Value"/>
                <button class="button button--small gnrt-btn--append">
                    <i class="fas fa-plus"></i>
                  </button>
                <button class="button button--small button--red gnrt-btn--remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <ul class="generator-input-list generator-input-list--nested"></ul>
        </li>
        `
    );
}

/**
 * Generator item view class.
 */
export default class GeneratorItemView extends AbstractView {
    /**
     * Getter for generator item template.
     * @abstract
     * @returns {string} Generator item template as a string.
     */
    get template() {
        return createGeneratorItemTemplate();
    }
}