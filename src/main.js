import "../public/style/style.css";
import HeaderView from "./view/header/header-view.js";
import MainContainerView from "./view/main/main-container-view.js";
import SidebarView from "./view/sidebar/sidebar-view.js";
import MainContentView from "./view/main/main-content-view.js";
import ToolbarView from "./view/toolbar/toolbar-view.js";
import EditorView from "./view/editor/editor-view.js";
import ModalView from "./view/modal/modal-view.js";
import NotificationView from "./view/notification/notification-view.js";
import { render } from "./framework/render.js";

const appElement = document.querySelector('#app');
const header = new HeaderView();
const mainContainer = new MainContainerView();
const mainContent = new MainContentView();
const toolbar = new ToolbarView();
const sidebar = new SidebarView();
const editor = new EditorView();
const modal = new ModalView();
const notification = new NotificationView();

render(header, appElement);
render(mainContainer, appElement);
render(sidebar, mainContainer.element);
render(mainContent, mainContainer.element);
render(toolbar, mainContent.element);
render(editor, mainContent.element);
render(modal, appElement);
render(notification, appElement);
