import { css } from "@emotion/react";
import { position } from "polished";
export const container = css`
  position: fixed;
  ${position(0)}
  z-index: 9;
  background-color: #fafafa;

  .ant-list-item-meta-title {
    margin: 0;
  }
`;

export const subject = css`
  margin: 0;
`;
export const header = css`
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
`;
export const content = css`
  width: 100%;
  overflow: hidden;
  padding: 12px 16px;
`;

export const close = css`
  border: none;
  background: none;
  cursor: pointer;
`;
