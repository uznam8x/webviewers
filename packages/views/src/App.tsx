import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Webview from "~/components/Webview";
import { RootState } from "~/store";
import { REGISTER } from "~/store/browsers";
import { TOOLBAR, STATUSBAR } from "~/store/view";
import ipc from "./ipc";
import * as styles from "./styles";

function Home() {
  const { frames } = useSelector((state: RootState) => state.browsers);
  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(
      REGISTER({
        location: "about:blank",
      })
    );
  };

  const handleToolbar = () => {
    dispatch(TOOLBAR());
  };
  const handleStatusbar = () => {
    dispatch(STATUSBAR());
  };

  const position: any = [
    [{ width: "100%", height: "100%" }],
    [
      { width: "50%", height: "100%" },
      { width: "50%", height: "100%", left: "50%", top: 0 },
    ],
    [
      { width: "33%", height: "100%", left: 0, top: 0 },
      { width: "34%", height: "100%", left: "33%", top: 0 },
      { width: "33%", height: "100%", left: "67%", top: 0 },
    ],
    [
      { width: "50%", height: "50%", left: 0, top: 0 },
      { width: "50%", height: "50%", left: "50%", top: 0 },
      { width: "50%", height: "50%", left: 0, top: "50%" },
      { width: "50%", height: "50%", left: "50%", top: "50%" },
    ],
    [
      { width: "50%", height: "100%", left: 0, top: 0 },
      { width: "25%", height: "50%", left: "50%", top: 0 },
      { width: "25%", height: "50%", left: "75%", top: 0 },
      { width: "25%", height: "50%", left: "50%", top: "50%" },
      { width: "25%", height: "50%", left: "75%", top: "50%" },
    ],
    [
      { width: "50%", height: "50%", left: 0, top: 0 },
      { width: "25%", height: "50%", left: "50%", top: 0 },
      { width: "25%", height: "50%", left: "75%", top: 0 },
      { width: "50%", height: "50%", left: 0, top: "50%" },
      { width: "25%", height: "50%", left: "50%", top: "50%" },
      { width: "25%", height: "50%", left: "75%", top: "50%" },
    ],
    [
      { width: "50%", height: "50%", left: 0, top: 0 },
      { width: "25%", height: "50%", left: "50%", top: 0 },
      { width: "25%", height: "50%", left: "75%", top: 0 },
      { width: "25%", height: "50%", left: "0%", top: "50%" },
      { width: "25%", height: "50%", left: "25%", top: "50%" },
      { width: "25%", height: "50%", left: "50%", top: "50%" },
      { width: "25%", height: "50%", left: "75%", top: "50%" },
    ],
    [
      { width: "25%", height: "50%", left: 0, top: 0 },
      { width: "25%", height: "50%", left: "25%", top: 0 },
      { width: "25%", height: "50%", left: "50%", top: 0 },
      { width: "25%", height: "50%", left: "75%", top: 0 },
      { width: "25%", height: "50%", left: "0%", top: "50%" },
      { width: "25%", height: "50%", left: "25%", top: "50%" },
      { width: "25%", height: "50%", left: "50%", top: "50%" },
      { width: "25%", height: "50%", left: "75%", top: "50%" },
    ],
  ];

  const init = () => {
    ipc.on("app.add.browser", handleRegister.bind(null));
    ipc.on("app.view.toolbar", handleToolbar);
    ipc.on("app.view.statusbar", handleStatusbar);

    return () => {
      ipc.removeListener("app.add.browser", handleRegister);
      ipc.removeListener("app.view.toolbar", handleToolbar);
      ipc.removeListener("app.view.statusbar", handleToolbar);
    };
  };
  useEffect(init, []);
  return (
    <div css={styles.container}>
      {frames.length ? (
        <div css={styles.row}>
          {frames.map((frame: any, i: number) => {
            return (
              <div
                css={styles.col}
                key={frame.id}
                style={{ ...(position[frames.length - 1][i] as any) }}
              >
                <Webview value={frame} />
              </div>
            );
          })}
        </div>
      ) : (
        <div css={styles.add}>
          Press{" "}
          <code css={{ backgroundColor: "#2a9d8f", color: "white" }}>CMD</code>{" "}
          + <code css={{ backgroundColor: "#e76f51", color: "white" }}>N</code>{" "}
          to open a new window.
        </div>
      )}
    </div>
  );
}

export default memo(Home);
