import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  toolbar: true,
  statusbar: true,
  activate: "",
};

const slice = createSlice({
  name: "browsers",
  initialState,
  reducers: {
    TOOLBAR: (state: any) => {
      return { ...state, toolbar: !state.toolbar };
    },
    STATUSBAR: (state: any) => {
      return { ...state, statusbar: !state.statusbar };
    },
    ACTIVATE: (state: any, { payload }) => {
      let stylesheet = document.querySelector("#Stylesheet");
      if (!stylesheet) {
        stylesheet = document.createElement("style");
        stylesheet.id = "Stylesheet";
        document.querySelector("head")?.appendChild(stylesheet);
      }
      stylesheet.textContent = `[data-frame="${payload}"] .webview__status-bar { background-color: #228176 !important; }`;

      return {...state, activate: payload};
    },
  },
});

export const { TOOLBAR, STATUSBAR, ACTIVATE } = slice.actions;
export const { reducer } = slice;
