import { createSlice } from "@reduxjs/toolkit";
import * as R from "ramda";
export type BrowserType = {
  history: string[];
  location: string;
  index: number;
  action?: "backward" | "forward" | "register";
  canBackward: boolean;
  canForward: boolean;
  id: string;
};

type BrowsersType = {
  [key: string]: BrowserType;
};

let initialState: BrowsersType = {};

let list: { [key: string]: any } = JSON.parse(
  window.localStorage.getItem("__BROWSERS__") || "{}"
);

if (Object.keys(list).length) {
  initialState = Object.entries(list).reduce((a, b) => {
    const [key, value] = b;
    return {
      ...a,
      [key]: {
        ...value,
        index: 0,
        history: [],
        canBackward: false,
        canForward: false,
      },
    };
  }, {});
}

const canMove = (state: BrowserType) => {
  const { index, history } = state;

  const len = history.length;
  return {
    ...state,
    canBackward: len > 1 && index > 1,
    canForward: index < len,
  };
};

const slice = createSlice({
  name: "browsers",
  initialState,
  reducers: {
    REGISTER: (state: BrowsersType, { payload }) => {
      const { id } = payload;
      const res = {
        ...state,
        ...{
          [id]: {
            ...payload,
            canBackward: false,
            canForward: false,
            history: [],
            index: 0,
          },
        },
      };

      return Object.keys(res).length > 8 ? state : res;
    },
    BACKWRD: (state: BrowsersType, { payload }) => {
      const { id, index, history } = payload;
      const idx = index - 1;

      let res = payload;

      // min
      if (idx > 0) {
        res = {
          ...res,
          location: history[idx - 1],
          index: idx,
          action: "backward",
        };
      }

      return {
        ...state,
        ...{
          [id]: canMove(res),
        },
      };
    },
    FORWARD: (state: BrowsersType, { payload }) => {
      const { id, index, history } = payload;
      const idx = index + 1;

      let res = payload;
      // max
      if (idx < history.length + 1) {
        res = {
          ...res,
          location: history[idx - 1],
          index: idx,
          action: "forward",
        };
      }

      return {
        ...state,
        ...{
          [id]: canMove(res),
        },
      };
    },
    LOCATION: (state, { payload }) => {
      const [key, value] = Object.entries(payload)[0] as any;
      const browse: BrowserType = state[key];
      return {
        ...state,
        [key]: {
          ...browse,
          ...value,
        },
      };
    },
    PUSH: (
      state: BrowsersType,
      {
        payload,
      }: {
        payload: { [key: string]: { location: string; [key: string]: any } };
      }
    ) => {
      const [key, value] = Object.entries(payload)[0];
      const browse: BrowserType = {
        ...state[key],
        ...(!!value.action ? { action: value.action } : {}),
      };

      if (
        !!browse.action &&
        (browse.action === "backward" || browse.action === "forward")
      ) {
      } else {
        const history = R.uniq([...browse.history, value.location]);

        let res = {
          ...browse,
          ...(value as Partial<BrowserType>),
          history,
          index: history.length,
        };
        return { ...state, [key]: canMove(res) };
      }
      return state;
    },
    DESTROY: (state, { payload }) => {
      const { id } = payload;
      const res = { ...state };
      delete res[id];
      return res;
    },
  },
});

export const {
  REGISTER,
  DESTROY,
  BACKWRD,
  FORWARD,
  PUSH,
  LOCATION,
} = slice.actions;
export const { reducer } = slice;
