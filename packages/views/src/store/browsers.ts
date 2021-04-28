import { createSlice } from "@reduxjs/toolkit";
import * as R from "ramda";
import str from "~/utils/str";
export type FrameType = {
  id: string;
  location: string;
  mode: "mobile" | "desktop";
};

type BrowsersType = {
  version: number;
  frames: FrameType[];
};

let initialState: BrowsersType = {
  version: 1,
  frames: [],
};

let cache: { [key: string]: any } = JSON.parse(
  window.localStorage.getItem("__BROWSERS__") || "{}"
);

if (!cache.version) {
  window.localStorage.setItem("__BROWSERS__", JSON.stringify({}));
}

if (cache.version === initialState.version) {
  initialState = cache as any;
  if(initialState.frames.length > 8) {
    initialState.frames = R.slice(0, 8)(initialState.frames);
  }
}

const slice = createSlice({
  name: "browsers",
  initialState,
  reducers: {
    REGISTER: (state: BrowsersType, { payload }) => {
      const frames = [
        ...state.frames,
        { id: str.random(), mode: "mobile", ...payload },
      ];

      const res = {
        ...state,
        frames,
      };
      if (res.frames.length > 8) {
        return state;
      }

      return res;
    },
    UPDATE: (state: BrowsersType, { payload }) => {
      const { id } = payload;

      const index = R.findIndex((frame: FrameType) => frame.id === id)(
        state.frames
      );

      const frames = R.update(index, payload)(state.frames);
      return { ...state, frames };
    },

    DESTROY: (state: BrowsersType, { payload }) => {
      const { id } = payload;
      const index = R.findIndex((frame: FrameType) => frame.id === id)(
        state.frames
      );
      const frames = R.remove<FrameType>(index, 1)(state.frames);
      return { ...state, frames };
    },
  },
});

export const { REGISTER, UPDATE, DESTROY } = slice.actions;
export const { reducer } = slice;
