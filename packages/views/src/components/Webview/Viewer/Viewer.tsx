import { jsx } from "@emotion/react";
import * as R from "ramda";
import { useContext, useEffect, useRef } from "react";
import URL from "url-parse";
import context from "../context";
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
  const { setStatus, setViewer, ...status } = useContext(context);

  const { location, canBackward, canForward, title } = status;

  let navigator: any = useRef<any>({
    location,
    canBackward,
    canForward,
  });

  const mode = useRef(status.mode);

  const config = {
    autosize: "on",
    webpreferences: "allowRunningInsecureContent=yes",
    useragent: getUserAgent(status.mode === "desktop"),
    enableremotemodule: "false",
  };

  const flow = useRef<any>([]);
  const ref = useRef<any>({ src: "" });

  const update = (e: any, src: string) => {
    navigator.current = R.mergeDeepLeft({
      location: src,
      title: e.target.getTitle(),
      canBackward: e.target.canGoBack(),
      canForward: e.target.canGoForward(),
    })(navigator.current);

    if (e.target.getTitle() !== status.title || src !== status.location) {
      const res = R.mergeDeepLeft(navigator.current)({
        location,
        canBackward,
        canForward,
        title,
      });
      setStatus(res);
    }
  };
  const handleCheck = (e: any) => {
    let src = e.target.src;
    if (!!src && /^http[s]?:\/\//g.test(src)) {
      src = URL(src).toString();
    }
    flow.current.push({ type: e.type, src });
    if (e.type === "did-start-loading") {
      ref.current.parentNode?.parentNode?.classList.add("webview--loading");
    }
    if (e.type === "did-stop-loading") {
      if (
        !R.equals(flow.current.map((v: any) => v.type))([
          "did-start-loading",
          "did-stop-loading",
        ])
      ) {
        setTimeout(update, 10, e, src);
      }
      ref.current.parentNode?.parentNode?.classList.remove("webview--loading");
      flow.current = [];
    }
  };

  const init = () => {
    const { current } = ref;
    current.addEventListener("will-navigate", handleCheck);
    current.addEventListener("did-navigate", handleCheck);
    current.addEventListener("did-navigate-in-page", handleCheck);
    current.addEventListener("will-navigate", handleCheck);
    current.addEventListener("dom-ready", handleCheck);
    current.addEventListener("did-start-loading", handleCheck);
    current.addEventListener("did-stop-loading", handleCheck);
    current.addEventListener("did-finish-load", handleCheck);

    ref.current.src = status.location;
    setViewer(ref.current);
    return () => {
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

  useEffect(init, []);

  useEffect(() => {
    if (ref.current.src !== status.location) {
      ref.current.src = status.location;
    }
    return () => {};
  }, [status.location]);

  useEffect(() => {
    if (status.mode !== mode.current) {
      window.location.reload();
    }
    return () => {};
  }, [status.mode]);

  return (
    <div css={styles.container}>
      {jsx("webview", {
        ref,
        ...config,
      })}
    </div>
  );
}
export default Viewer;
