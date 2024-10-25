import AbstractView from "../../framework/view/abstract-view";

function createKeyValueListTemplate() {
    return (
        `
        <ul class="key-value-list" id="key-value-list"></div>
        `
    );
}

/**
 * KeyValueList view class.
 */
export default class KeyValueListView extends AbstractView {

    /**
     * Getter for list template.
     * @abstract
     * @returns {string} List template as a string.
     */
    get template() {
        return createKeyValueListTemplate();
    }
}