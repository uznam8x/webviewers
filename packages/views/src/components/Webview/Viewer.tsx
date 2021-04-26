import { jsx } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserType, PUSH } from "~/store/browsers";
import * as styles from "./styles";

export type Props = {
  onChanged?: (url: string) => void;
  [key: string]: any;
  config?: { toolbar: { desktop: boolean } };
  browser: BrowserType;
};

const getUserAgent = (isDesktop: boolean) =>
  isDesktop
    ? "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36"
    : "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";

function Viewer({ browser, config = { toolbar: { desktop: true } } }: Props) {
  const args: any = {
    autosize: "on",
    webpreferences: "allowRunningInsecureContent=yes",
    useragent: getUserAgent(true),
    plugins: "true",
  };

  const [navigator, setNavigator] = useState<any>(args);
  const dispatch = useDispatch();
  const ref = useRef<any>(null);
  const handleNavigate = (e: any) => {
    if (e.url !== browser.location) {
      dispatch(PUSH({ [browser.id]: { location: e.url } }));
    }
    // push(e.url);
    // console.log("handleNavigate");
  };

  const handleCheck = (e: any) => {
    console.log(`## ${e.type}`);
  };

  const init = () => {
    ref.current.addEventListener("did-navigate", handleNavigate);
    ref.current.addEventListener("did-navigate", handleCheck);
    ref.current.addEventListener("did-navigate-in-page", handleCheck);
    ref.current.addEventListener("will-navigate", handleCheck);
    ref.current.addEventListener("dom-ready", handleCheck);
    ref.current.addEventListener("did-start-loading", handleCheck);
    ref.current.addEventListener("did-stop-loading", handleCheck);
    ref.current.addEventListener("did-finish-load", handleCheck);

    return () => {};
  };

  useEffect(init, []);

  const handleReload = () => {
    if (ref.current.reloadIgnoringCache) {
      setNavigator((state: any) => ({
        ...state,
        
        useragent: getUserAgent(config.toolbar.desktop),
      }));
    }
  };
  useEffect(handleReload, [config]);
  return (
    <div css={styles.viewer}>
      {jsx("webview", {
        ref,
        src: browser.location,
        "data-updated-at": +new Date(),
        ...navigator,
      })}
    </div>
  );
}

export default Viewer;
