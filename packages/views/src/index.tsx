import "antd/dist/antd.css";
import "./index.css";

import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "~/store";

declare const __VERSION__: string;

const version = window.localStorage.getItem("__VERSION__") || "";
if (version !== __VERSION__) {
  window.localStorage.setItem("__LAYOUT__", JSON.stringify([]));
  window.localStorage.setItem("__BROWSERS__", JSON.stringify([]));
}

window.localStorage.setItem("__VERSION__", __VERSION__);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
