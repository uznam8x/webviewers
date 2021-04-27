import { memo, useEffect, useState } from "react";
import { BrowserType } from "~/store/browsers";
import * as styles from "./styles";
import Toolbar from "./Toolbar";
import Viewer from "./Viewer";
import Context from "./context";
export type Props = {
  className?: string;
  children?: React.ReactNode;
  value: BrowserType;

  [key: string]: any;
};

function Webview({ value }: Props) {
  const [config, setConfig] = useState<any>({
    isDesktop: false,
    browser: null,
  });
  const toggleDesktop = () => {
    setConfig((state: any) => ({ ...state, isDesktop: !state.isDesktop }));
  };

  const handleConfigUpdate = () => {
    setConfig((state: any) => ({ ...state, browser: value }));
    return () => {};
  };

  useEffect(handleConfigUpdate, [value]);

  return config.browser ? (
    <Context.Provider value={{ ...config, toggleDesktop }}>
      <div css={styles.container}>
        <Toolbar />
        <Viewer />
      </div>
    </Context.Provider>
  ) : null;
}

export default memo(Webview);
