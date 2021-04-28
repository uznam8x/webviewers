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

export const loading = css`
  display: none;

  .webview--loading & {
    display: block;
    padding-left: 4px;
  }
`;

export const title = css`
  padding-left: 6px;
  line-height: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
