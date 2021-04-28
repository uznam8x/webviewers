import { css } from "@emotion/react";
export const container = css`
  position: relative;
  background-color: #eee;
`;

export const button = css`
  background: none;
  border: 0;
  width: 28px;
  height: 28px;
  cursor: pointer;
`;
export const fullscreen = (isFullscreen: boolean) =>
  isFullscreen
    ? css`
        color: white;
        background-color: #f4a261;
      `
    : css``;

export const desktop = (isDesktop: boolean) =>
  isDesktop
    ? css`
        color: white;
        background-color: #2a9d8f;
      `
    : css``;
