import { jsx } from "@emotion/react";
import { useContext, useEffect, useRef } from "react";
import context from "../context";
import * as styles from "./styles";
import * as R from "ramda";
export type Props = {
  onChanged?: (url: string) => void;
  [key: string]: any;
};

const getUserAgent = (isDesktop: boolean) =>
  isDesktop
    ? "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36"
    : "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";

function Viewer() {
  const { setStatus, setViewer, ...status } = useContext(context);

  const {
    id,
    isFullscreen,
    isLoading,
    location,
    mode,
    canBackward,
    canForward,
  } = status;
  let navigator: any = {
    id,
    isFullscreen,
    isLoading,
    location,
    mode,
    canBackward,
    canForward,
  };

  console.log("Viewer", JSON.parse(JSON.stringify(navigator)));
  const config = {
    autosize: "on",
    webpreferences: "allowRunningInsecureContent=yes",
    useragent: getUserAgent(status.mode === "desktop"),
    enableremotemodule: "false",
  };

  const ref = useRef<any>(null);
  const handleCheck = (e: any) => {
    let res = R.mergeDeepLeft({
      ...(!!e.url && { location: e.url }),
      canBackward: e.target.canGoBack(),
      canForward: e.target.canGoForward(),
      isLoading: e.target.isLoading(),
    })(navigator);

    if (!R.equals(navigator, res)) {
      console.log("event", JSON.stringify(navigator), JSON.stringify(res));
      navigator = JSON.parse(JSON.stringify(res));
      setStatus(navigator);
    }
    
  };

  const init = () => {
    const { current } = ref;
    //current.addEventListener("load-commit", handleCheck);
    current.addEventListener("will-navigate", handleCheck);
    current.addEventListener("did-navigate", handleCheck);
    current.addEventListener("did-navigate-in-page", handleCheck);
    current.addEventListener("will-navigate", handleCheck);
    current.addEventListener("dom-ready", handleCheck);
    current.addEventListener("did-start-loading", handleCheck);
    current.addEventListener("did-stop-loading", handleCheck);
    current.addEventListener("did-finish-load", handleCheck);

    return () => {
      //current.removeEventListener("load-commit", handleCheck);
      current.removeEventListener("will-navigate", handleCheck);
      current.removeEventListener("did-navigate", handleCheck);
      current.removeEventListener("did-navigate-in-page", handleCheck);
      current.removeEventListener("will-navigate", handleCheck);
      current.removeEventListener("dom-ready", handleCheck);
      current.removeEventListener("did-start-loading", handleCheck);
      current.removeEventListener("did-stop-loading", handleCheck);
      current.removeEventListener("did-finish-load", handleCheck);
    };
  };

  useEffect(init, [navigator]);

  useEffect(() => {
    setViewer(ref.current);
  }, [ref.current]);

  return (
    <div css={styles.container}>
      {jsx("webview", {
        key: status.id,
        ref,
        src: status.location,
        ...config,
      })}
    </div>
  );
}

export default Viewer;
