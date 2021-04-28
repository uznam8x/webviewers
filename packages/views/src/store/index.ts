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
  w((state, oldVal, objectPath) => {
    const frames = state.frames.map(({ id, location, mode }: any) => ({
      id,
      location,
      mode,
    }));

    window.localStorage.setItem(
      "__BROWSERS__",
      JSON.stringify({ ...state, frames })
    );
  })
);

export default store;
