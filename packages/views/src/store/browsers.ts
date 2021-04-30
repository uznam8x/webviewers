import { createSlice } from "@reduxjs/toolkit";
import * as R from "ramda";
export type FrameType = {
  id: string;
  location: string;
  mode: "mobile" | "desktop";
};

let initialState: FrameType[] = JSON.parse(
  window.localStorage.getItem("__BROWSERS__") || "[]"
);

const slice = createSlice({
  name: "browsers",
  initialState,
  reducers: {
    REGISTER: (state: FrameType[], { payload }) => {
      const frames = [...state, { mode: "mobile", ...payload }];

      if (frames.length > 8) {
        return state;
      }
      return frames;
    },
    UPDATE: (state: FrameType[], { payload }) => {
      const { id } = payload;

      const index = R.findIndex((frame: FrameType) => frame.id === id)(state);

      const frames = R.update(index, payload)(state);
      return frames;
    },

    DESTROY: (state: FrameType[], { payload }) => {
      const { id } = payload;
      const index = R.findIndex((frame: FrameType) => frame.id === id)(state);
      const frames = R.remove<FrameType>(index, 1)(state);
      return frames;
    },
    
  },
});

export const { REGISTER, UPDATE, DESTROY } = slice.actions;
export const { reducer } = slice;
