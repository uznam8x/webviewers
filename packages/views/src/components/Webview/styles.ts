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

export const fullscreen = css``;

export const global = (id: string, isFullscreen: boolean) =>
  isFullscreen
    ? css`
        [data-frame="${id}"] {
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          height: 100% !important;
          z-index: 99 !important;
          transform: none !important;
          .react-dragable-handle {
            visibility: hidden;
            pointer-events: none;
          }
          .react-resizable-handle {
            display: none;
          }
        }
      `
    : css``;
