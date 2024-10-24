import "../public/style/style.css";
import HeaderPresenter from "./presenter/header/header-presenter.js";
import MainPresenter from "./presenter/main/main-presenter.js";

const appElement = document.querySelector('#app');
const headerPresenter = new HeaderPresenter({container: appElement});
const mainPresenter = new MainPresenter({container: appElement});

headerPresenter.init();
mainPresenter.init();
