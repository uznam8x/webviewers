import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as browsers from "./browsers";
import * as view from "./view";
import watch from "redux-watch";
const reducer = combineReducers({
  browsers: browsers.reducer,
  view: view.reducer,
});

export type RootState = ReturnType<typeof reducer>;

const store = configureStore({
  reducer,
  devTools: true,
});

let w = watch(store.getState, "browsers");
store.subscribe(
  w((newVal, oldVal, objectPath) => {
    const state = Object.entries(store.getState().browsers).reduce((a, b) => {
      const [key, value]: any = b;

      const { id, location } = value;
      return { ...a, [key]: { id, location } };
    }, {});

    window.localStorage.setItem("__BROWSERS__", JSON.stringify(state));
  })
);

export default store;
