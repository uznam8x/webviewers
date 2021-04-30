import { css } from "@emotion/react";
import { rgba } from "polished";
export const container = css`
  position: relative;
  z-index: 9;
  padding: 8px;
  background-color: #11403A;
`;

const btn = css`
  display: inline-flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  &[disabled] {
    background-color: #888 !important;
  }
  transition: background-color 0.3s ease-out;
`;

export const backward = css`
  ${btn}
  background-color: #f4a261;
  color: white;
`;
export const forward = css`
  ${btn}
  background-color: #e9c46a;
  color: white;
`;

export const reload = css`
  ${btn}
  background-color: #2a9d8f;
  color: white;
`;

export const close = css`
  ${btn}
  background-color: #e76f51;
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

export const search = css`
  border-radius: 16px;
  border-color: ${rgba("#ffffff", 0.25)};
  background-color: ${rgba("#ffffff", 0.2)};
  color: white;
`;
