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
  updateElement(update) {
    if (!update) {
      return;
    }

    this._setState(update);
    this.#rerenderElement();
  }

  /**
   * Restore listeners after rerender method
   * @abstract
   */
  _restoreHandlers() {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }

  /**
   * Restore elements childs after rerender method
   * @abstract
   * @param {Object} prevElement Previous element
   * @param {Object} newElement New element
   */
  _restoreChilds(prevElement, newElement) {
    throw new Error('Abstract method not implemented: restoreChilds');
  }

  /**
   * State update method
   * @param {Object} update Object with updated state
   */
  _setState(update) {
    this._state = structuredClone({ ...this._state, ...update });
  }

  /** Rerender element method */
  #rerenderElement() {
    const prevElement = this.element;
    const parent = prevElement.parentElement;

    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);

    this._restoreChilds(prevElement, newElement)
    this._restoreHandlers();
  }
}
