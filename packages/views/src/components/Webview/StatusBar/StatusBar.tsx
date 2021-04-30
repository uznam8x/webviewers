import {
  CompressOutlined,
  DesktopOutlined,
  ExpandOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import * as R from "ramda";
import { memo, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import context from "../context";
import * as styles from "./styles";

export type Props = {
  [key: string]: any;
};

function StatusBar({ children, ...args }: Props) {
  const { view } = useSelector(
    (state: any) => state,
    (prev, next) => prev.view.statusbar === next.view.statusbar
  );

  const { setStatus, ...status } = useContext(context);
  const [index, setIndex] = useState(-1);

  const [setting, setSetting] = useState<any>({
    isFullscreen: status.isFullscreen,
    mode: status.mode,
  });

  const handleDesktop = () => {
    setSetting((state: any) =>
      R.mergeDeepLeft({
        mode: status.mode === "mobile" ? "desktop" : "mobile",
      })(state)
    );
  };
  const handleFullscreen = () => {
    setSetting((state: any) =>
      R.mergeDeepLeft({
        isFullscreen: !state.isFullscreen,
      })(state)
    );
  };

  const handleSync = () => {
    setStatus(setting);
  };

  useEffect(handleSync, [setting.mode, setting.isFullscreen]);

  const handleArrange = (e: any) => {
    const idx = R.findIndex((v: any) => v.i === status.id)(e.detail);
    setIndex(() => idx);
  };
  const init = () => {
    window.addEventListener("ARRANGE", handleArrange);
    return () => {
      window.removeEventListener("ARRANGE", handleArrange);
    };
  };
  useEffect(init, [index]);

  return view.statusbar ? (
    <div css={styles.container} {...args} className="webview__status-bar">
      <button
        type="button"
        css={styles.handle}
        className="react-dragable-handle"
      ></button>
      <div css={styles.title}>
        {index > -1 && <span>[{index+1}]</span>}
        <LoadingOutlined /> <span>{status.title}</span>
      </div>
      <div css={styles.desktop(status.mode === "desktop")}>
        <button type="button" css={[styles.button]} onClick={handleDesktop}>
          <DesktopOutlined />
        </button>
      </div>
      <div css={styles.fullscreen(status.isFullscreen)}>
        <button type="button" css={[styles.button]} onClick={handleFullscreen}>
          {status.isFullscreen ? <CompressOutlined /> : <ExpandOutlined />}
        </button>
      </div>
    </div>
  ) : null;
}

export default memo(StatusBar);
