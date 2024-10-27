import AbstractView from "../../framework/view/abstract-view";
import ButtonView from "../button/button-view.js";

function createToolbarTemplate() {
    const buttonsTemplate = [
        new ButtonView({modifiers: ['button--green tlb-btn--apply'], buttonContent: 'Apply'}).template,
        new ButtonView({modifiers: ['button--red tlb-btn--clear'], buttonContent: 'Clear'}).template,
        new ButtonView({modifiers: ['tlb-btn--save'], buttonContent: 'Save'}).template,
        new ButtonView({modifiers: ['tlb-btn--copy'], buttonContent: 'Copy'}).template,
    ]

    return (
        `
        <div class="toolbar">
          <div class="toolbar__left">
            ${buttonsTemplate[0]}
            ${buttonsTemplate[1]}
          </div>
          <div class="toolbar__right">
            ${buttonsTemplate[2]}
            ${buttonsTemplate[3]}
          </div>
        </div>
        `
    );
}

/**
 * Toolbar view class.
 */
export default class ToolbarView extends AbstractView {
    // #onApplyClick = null;
    // #onClearClick = null;
    // #onSaveClick = null;
    // #onCopyClick = null;

    // constructor({onApplyClick, onClearClick, onSaveClick, onCopyClick}) {
    //     super();
    // }

    /**
     * Getter for toolbar template.
     * @returns {string} Toolbar template as a string.
     */
    get template() {
        return createToolbarTemplate();
    }
}