import { Global } from "@emotion/react";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { DESTROY, FrameType, UPDATE } from "~/store/browsers";
import { ACTIVATE } from "~/store/view";
import Context from "./context";
import StatusBar from "./StatusBar";
import * as R from "ramda";
import * as styles from "./styles";
import Toolbar from "./Toolbar";
import Viewer from "./Viewer";
export type Props = {
  className?: string;
  children?: React.ReactNode;
  value: FrameType;

  [key: string]: any;
};

function Webview({ value }: Props) {
  const status = useRef({
    id: "",
    mode: "mobile",
    canBackward: false,
    canForward: false,
    isLoading: false,
    isFullscreen: false,
  });

  const [config, setConfig] = useState<any>(
    R.mergeDeepLeft(value)(status.current)
  );
  const [viewer, setViewer] = useState<any>({ src: "about:blank" });

  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const handleStatus = (payload: any) => {
    setConfig((state: any) => R.mergeDeepLeft(payload)(state));
  };

  const handleGoBackward = () => {
    if (viewer !== null) {
      (viewer as any).goBack();
    }
  };
  const handleGoForward = () => {
    if (viewer !== null) {
      (viewer as any).goForward();
    }
  };
  const handleReload = () => {
    if (viewer !== null) {
      (viewer as any).reloadIgnoringCache();
    }
  };

  const handleDestroy = () => {
    const { id } = config;
    dispatch(DESTROY({ id }));
  };

  const handleConfigUpdate = () => {
    if (
      config.id !== value.id ||
      config.location !== value.location ||
      config.mode !== value.mode
    ) {
      setConfig((state: any) => ({
        ...state,
        ...value,
      }));
    }

    return () => {};
  };
  useEffect(handleConfigUpdate, [value]);

  useEffect(() => {
    const { id, mode, canBackward, canForward, isLoading, location } = config;

    dispatch(
      UPDATE({ id, mode, canBackward, canForward, isLoading, location })
    );
  }, [config.location, config.mode, config.id]);

  const handleClick = () => {
    dispatch(ACTIVATE(config.id));
  };

  const init = () => {
    ref.current?.addEventListener("click", handleClick);
    return () => {
      ref.current?.removeEventListener("click", handleClick);
    };
  };
  useEffect(init, [ref]);

  return (
    <Context.Provider
      value={{
        ...config,
        viewer,
        setViewer,
        setStatus: handleStatus,
        goBackard: handleGoBackward,
        goForward: handleGoForward,
        reload: handleReload,
        destroy: handleDestroy,
      }}
    >
      <Global styles={styles.global(config.id, config.isFullscreen)} />
      <div
        css={[styles.container, config.isFullscreen && styles.fullscreen]}
        ref={ref}
      >
        <StatusBar />
        <Toolbar />
        {config.location === "about:blank" ? (
          <div css={styles.blank}></div>
        ) : (
          <Viewer />
        )}
      </div>
    </Context.Provider>
  );
}

export default memo(Webview);
