import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { DESTROY, FrameType, UPDATE } from "~/store/browsers";
import Context from "./context";
import StatusBar from "./StatusBar";
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
  const timeout = useRef<any>(null);
  const status = useRef({
    id: "",
    mode: "mobile",
    canBackward: false,
    canForward: false,
    isLoading: false,
    isFullscreen: false,
  });

  const [config, setConfig] = useState<any>({ ...status.current, ...value });
  const [viewer, setViewer] = useState<any>(null);

  const dispatch = useDispatch();

  const handleStatus = (payload: any) => {
    clearTimeout(timeout.current);

    status.current = { ...status.current, ...payload };
    timeout.current = setTimeout(() => {
      setConfig(() => status.current);
    }, 1);
  };

  // dispatch(UPDATE(res));
  const handleGoBackward = () => {
    if (viewer !== null) {
      (viewer as any).goBack();
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
      <div css={[styles.container, config.isFullscreen && styles.fullscreen]}>
        <Toolbar />
        {config.location === "about:blank" ? (
          <div css={styles.blank}></div>
        ) : (
          <Viewer />
        )}

        <StatusBar />
      </div>
    </Context.Provider>
  );
}

export default memo(Webview);
