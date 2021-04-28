import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toolbar: true,
  statusbar: true,
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
  },
});

export const { TOOLBAR, STATUSBAR } = slice.actions;
export const { reducer } = slice;
