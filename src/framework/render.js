import AbstractView from './view/abstract-view.js';

/**
 * Enum for render positions.
 * @enum {string}
 */
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

/**
 * Creates a DOM element from an HTML template string.
 *
 * @param {string} template - The HTML template string from which to create the element.
 * @returns {HTMLElement} The created DOM element.
 */
function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
}

/**
 * Renders a component into a specified container at a specified position.
 *
 * @param {AbstractView} component - The component to render.
 * @param {HTMLElement} container - The container to which the component will be rendered.
 * @param {string} [place=RenderPosition.BEFOREEND] - The position where the component will be inserted.
 */
function render(component, container, place = RenderPosition.BEFOREEND) {
  container.insertAdjacentElement(place, component.element);
}

/**
 * Removes a component from the DOM.
 *
 * @param {AbstractView|null} component - The component to remove. If null, nothing happens.
 * @throws {Error} Throws an error if the provided component is not an instance of AbstractView.
 */
function remove(component) {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.element.remove();
  component.removeElement();
}

export { RenderPosition, createElement, render, remove };
