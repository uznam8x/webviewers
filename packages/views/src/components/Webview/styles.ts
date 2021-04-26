import { css } from "@emotion/react";
import { rgba } from "polished";
export const container = css`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: white;
`;

export const toolbar = css`
  position: relative;
  z-index: 9;
  padding: 8px;
  background-color: #264653;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 1px 4px 1px rgb(0, 0, 0, 0.1);
`;

export const toolbarBackward = css`
  background-color: #f4a261;
  border: 1px solid transparent;
  color: white;
`;
export const toolbarForward = css`
  background-color: #e9c46a;
  border: 1px solid transparent;
  color: white;
`;
export const toolbarDesktop = (isDesktop: boolean) => css`
  ${isDesktop
    ? css`
        background-color: #2a9d8f;
        color: white;
      `
    : css`
        background-color: #f2f2f2;
        color: black;
      `}

  border: 1px solid transparent;
`;
export const toolbarClose = css`
  background-color: #e76f51;
  border: 1px solid transparent;
  color: white;
`;
export const viewer = css`
  flex: 1;
  webview {
    height: 100%;
  }
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

export const search = css`
  border-radius: 16px;
  border-color: ${rgba("#ffffff", 0.25)};
  background-color: ${rgba("#ffffff", 0.2)};
  color: white;
`;
