import { memo, useState } from "react";
import { BrowserType } from "~/store/browsers";
import * as styles from "./styles";
import Toolbar from "./Toolbar";
import Viewer from "./Viewer";
// import useHistory from "~/hooks/useHistory";
export type Props = {
  className?: string;
  children?: React.ReactNode;
  value: BrowserType;

  [key: string]: any;
};

function Webview({ value }: Props) {
  const browser = value;
  const [config, setConfig] = useState({ toolbar: { desktop: true } });
  const handleChange = (config: any) => {
    setConfig((state) => ({ ...state, ...config }));
  };
  return browser ? (
    <div css={styles.container}>
      <Toolbar browser={browser} onChange={handleChange} />
      <Viewer browser={browser} config={config} />
    </div>
  ) : null;
}

export default memo(Webview);
