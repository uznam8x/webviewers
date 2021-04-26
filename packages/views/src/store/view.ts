import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toolbar: true,
};

const slice = createSlice({
  name: "browsers",
  initialState,
  reducers: {
    TOOLBAR: (state: any) => {
      return { ...state, toolbar: !state.toolbar };
    },
  },
});

export const { TOOLBAR } = slice.actions;
export const { reducer } = slice;
