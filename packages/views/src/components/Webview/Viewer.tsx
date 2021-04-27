import { jsx } from "@emotion/react";
import { useContext, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { PUSH } from "~/store/browsers";
import context from "./context";
import * as styles from "./styles";

export type Props = {
  onChanged?: (url: string) => void;
  [key: string]: any;
};

const getUserAgent = (isDesktop: boolean) =>
  isDesktop
    ? "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36"
    : "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";

function Viewer() {
  const { isDesktop, browser } = useContext(context);

  const config = {
    autosize: "on",
    webpreferences: "allowRunningInsecureContent=yes",
    useragent: getUserAgent(isDesktop),
    plugins: "true",
  };

  const dispatch = useDispatch();
  const ref = useRef<any>(null);
  const handleNavigate = (e: any) => {
    if (e.url !== browser.location) {
      dispatch(PUSH({ [browser.id]: { location: e.url } }));
    }
  };

  const handleCheck = (e: any) => {
    console.log(`## ${e.type}`);
  };

  const init = () => {

    const {current} = ref;
    current.addEventListener("did-navigate", handleNavigate);
    current.addEventListener("did-navigate", handleCheck);
    current.addEventListener("did-navigate-in-page", handleCheck);
    current.addEventListener("will-navigate", handleCheck);
    current.addEventListener("dom-ready", handleCheck);
    current.addEventListener("did-start-loading", handleCheck);
    current.addEventListener("did-stop-loading", handleCheck);
    current.addEventListener("did-finish-load", handleCheck);

    return () => {
      current.removeEventListener("did-navigate", handleNavigate);
      current.removeEventListener("did-navigate", handleCheck);
      current.removeEventListener("did-navigate-in-page", handleCheck);
      current.removeEventListener("will-navigate", handleCheck);
      current.removeEventListener("dom-ready", handleCheck);
      current.removeEventListener("did-start-loading", handleCheck);
      current.removeEventListener("did-stop-loading", handleCheck);
      current.removeEventListener("did-finish-load", handleCheck);
    };
  };

  useEffect(init, []);

  return (
    <div css={styles.viewer}>
      {jsx("webview", {
        ref,
        src: browser.location,
        "data-updated-at": +new Date(),
        ...config,
      })}
    </div>
  );
}

export default Viewer;
