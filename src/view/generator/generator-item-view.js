import AbstractView from "../../framework/view/abstract-view.js";

function createGeneratorItemTemplate() {
    return (
        `
        <li>
            <div class="generator-item">
                <input type="text" class="generator-item__input" placeholder="Key"/>
                <input type="text" class="generator-item__input" placeholder="Value"/>
                <div class="generator__buttons-container"></div>
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