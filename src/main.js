import "../public/style/style.css";
import HeaderPresenter from "./presenter/header-presenter.js";
import MainPresenter from "./presenter/main-presenter.js";

const appElement = document.querySelector('#app');
const headerPresenter = new HeaderPresenter({container: appElement});
const mainPresenter = new MainPresenter({container: appElement});

headerPresenter.init();
mainPresenter.init();
