import AbstractView from './abstract-view.js';

/**
 * Abstract view class with state
 */
export default class AbstractStatefulView extends AbstractView {
  /** @type {Object} State object */
  _state = {};

  /**
   * State update and rerender element method
   * @param {Object} update Object with updated state
   */
  updateElement(update, modifier = 'update') {
    if (!update) {
      return;
    }

    if (modifier === 'update') {
      this._setState(update);
      this.#rerenderElement();
    } else if (modifier === 'rewrite') {
      this._state = update;
      this.#rerenderElement();
    }
  }

  /**
   * Restore listeners after rerender method
   * @abstract
   */
  _restoreHandlers() {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }

  /**
   * State update method
   * @param {Object} update Object with updated state
   */
  _setState(update) {
    this._state = structuredClone({...this._state, ...update});
  }

  /** Rerender element method */
  #rerenderElement() {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);

    this._restoreHandlers();
  }
}