import { css } from "@emotion/react";
export const container = css`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: white;
`;

export const blank = css`
  flex: 1;
`;

export const fullscreen = css`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
`;
