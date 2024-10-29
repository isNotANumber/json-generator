import "../public/style/style.css";
import MainPresenter from "./presenter/main/main-presenter.js";

const appElement = document.querySelector('#app');
const mainPresenter = new MainPresenter({container: appElement});

mainPresenter.init();
