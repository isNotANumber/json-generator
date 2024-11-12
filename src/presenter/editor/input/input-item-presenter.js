import { render, remove } from '../../../framework/render.js';
import { generateRandomId } from '../../../util.js';
import ArrayItemView from '../../../view/editor/input/items/array-item-view.js';
import StringItemView from '../../../view/editor/input/items/string-item-view.js';
import ObjectItemView from '../../../view/editor/input/items/object-item-view.js';

export default class InputItemPresenter {
  #container = null;
  #parentComponent = null
  #arrayComponent = null;
  #childComponents = new Map();

  constructor({ id, container }) {
    this.#container = container;
  }

  init(item) {
    this.#renderObjectTypeItem(this.#container);

    // this.appendArrayItemPart();
    // this.appendStringItemPart();

    // this.getItemAsObject();
  }

  // -- Render methods -- //

  #renderObjectTypeItem(container, props) {
    props = props ? props : {id: generateRandomId()};

    this.#parentComponent = new ObjectItemView({...props, onItemFieldChange: this.#handleItemInput});

    render(this.#parentComponent, container);
  }

  // -- Handlers -- //

  #handleItemInput = (evt) => {
    const targetId = evt.target.closest('.input-item').dataset.id;

    const targetItem = this.getComponentById(targetId);

    const fieldClass = evt.target.classList;

    if (fieldClass.contains('input-item__field_key')) {
      targetItem._setState({ key: evt.target.value });
    } else if (fieldClass.contains('input-item__field_value')) {
      targetItem._setState({ value: evt.target.value });
    } else if (fieldClass.contains('input-item__value_type')) {
      targetItem._setState({ selectedType: evt.target.value });
    }
  };

  // -- Child methods -- //

  appendArrayItemPart(targetId) {
    const targetComponent = this.getComponentById(targetId);

    if (this.#arrayComponent === null) {
        this.#arrayComponent = new ArrayItemView({id: generateRandomId(), parentId: this.#parentComponent.id, rootId: this.#parentComponent.id});

        render(this.#arrayComponent, targetComponent.childrenContainer);

        return this.#arrayComponent.id;
    }

    const arrayTypeItem = new ArrayItemView({id: generateRandomId(), parentId: targetId, rootId: this.#parentComponent.id});
    this.#childComponents.set(arrayTypeItem.id, arrayTypeItem);

    render(arrayTypeItem, targetComponent.childrenContainer);

    return arrayTypeItem.id;

    // if (this.#arrayComponent === null) {
    //     this.#arrayComponent = new ArrayItemView({id: generateRandomId(), parentId: this.#parentComponent.id});

    //     render(this.#arrayComponent, this.#parentComponent.childrenContainer);

    //     return this.#arrayComponent.id;
    // } else if (this.#arrayComponent.parentId === targetId) {
    //     const arrayTypeItem = new ArrayItemView({id: generateRandomId(), parentId: this.#arrayComponent.id});
    //     this.#childComponents.set(arrayTypeItem.id, arrayTypeItem);

    //     render(arrayTypeItem, this.#arrayComponent.childrenContainer);

    //     return arrayTypeItem.id;
    // }
  }

  appendStringItemPart(targetId, props) {
    // test
    // targetId = this.#parentComponent.id;

    props = props ? props : {id: generateRandomId(), parentId: targetId};

    const parentItemContainer = targetId === this.#parentComponent.id ? 
        this.#parentComponent.childrenContainer :
        this.#childComponents.get(targetId).childrenContainer;

    const stringTypeItem = new StringItemView({...props});
    this.#childComponents.set(stringTypeItem.id, stringTypeItem);

    render(stringTypeItem, parentItemContainer);
  }

  removeItemPart(id) {
    remove(this.#childComponents.get(id));
    this.#childComponents.delete(id);
  }

  // -- Common -- // 

  getItemAsObject() {
    const result = {key: this.#parentComponent.getStateValueAsObject().value, value: null}

    if (!this.#childComponents.size) {
        return result;
    }

    for (const item of this.#childComponents.values()) {
        const itemValue = item.getStateValueAsObject().value;

        if (Array.isArray(result.value)) {
            result.value.push(itemValue);
        } else {
            result.value = itemValue;
        }
    }

    return result;
  }

  getComponentById(id) {
    if (this.#parentComponent.id === id) {
        return this.#parentComponent;
    } else if (this.#arrayComponent.id === id) {
        return this.#arrayComponent;
    }

    return this.#childComponents.get(id);
  }

  get id() {
    console.log(this.#parentComponent)
    return this.#parentComponent.id;
  }
}