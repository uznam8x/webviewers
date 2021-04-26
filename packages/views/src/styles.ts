import { css } from "@emotion/react";
export const container = css`
  position: relative;
  height: 100%;
  background-color: #264653;
`;
export const row = css`
  height: 100%;
  position: relative;
  padding: 0;
  margin: -1px -1px;
`;
export const col = css`
  position: absolute;
  left: 0;
  top: 0;
  padding: 1px 1px;
  background-color: transparent !important;
`;

export const add = css`
  position: absolute;
  left: 15%;
  top: 25%;
  color: white;
  line-height: 1;
  display: flex;
  align-items: center;
  
  code {
    display: inline-block;
    padding: 8px 10px 6px;
    margin: 0 6px;
    border-radius: 4px;
  }
`;
export const button = css`
  text-align: center;
  cursor: pointer;
`;
