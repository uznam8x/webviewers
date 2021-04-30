import { css } from "@emotion/react";
export const container = css`
  position: relative;
  background-color: #13242a;
  /* background-color: #228176; */
`;

export const handle = css`
  width: 100%;
  height: 28px;
  border: 0;
  background-color: transparent;
  color: #fff;
  outline: none;
`;

export const content = css`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const button = css`
  background: none;
  border: 0;
  width: 28px;
  height: 28px;
  cursor: pointer;
  outline: none;
`;

export const loading = css`
  display: none;

  .webview--loading & {
    display: block;
    padding-left: 4px;
  }
`;

export const title = css`
  color: #fff;
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 6px;
  line-height: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  pointer-events: none;

  span.anticon {
    display: none;
    margin-right: 8px;
  }
  .webview--loading & {
    span.anticon {
      display: inline-block;
    }
  }
`;
export const fullscreen = (isFullscreen: boolean) => css`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  ${isFullscreen
    ? css`
        color: white;
        background-color: #f4a261;
      `
    : css``}
`;

export const desktop = (isDesktop: boolean) => css`
  position: absolute;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  ${isDesktop
    ? css`
        color: white;
        background-color: #2a9d8f;
      `
    : css``}
`;
