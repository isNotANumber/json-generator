import "../public/style/style.css";
import HeaderView from "./view/header-view";
import { render, RenderPosition } from "./framework/render";

const appElement = document.querySelector('#app');
console.log(appElement)
const header = new HeaderView();

render(header, appElement, RenderPosition.AFTERBEGIN);
