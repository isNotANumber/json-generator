import "../public/style/style.css";
import GeneralPresenter from "./presenter/general/general-presenter.js";

const appElement = document.querySelector('#app');
const generalPresenter = new GeneralPresenter({container: appElement});

generalPresenter.init();
