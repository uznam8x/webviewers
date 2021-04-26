import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Webview from "~/components/Webview";
import { RootState } from "~/store";
import { REGISTER } from "~/store/browsers";
import { TOOLBAR } from "~/store/view";
import str from "~/utils/str";
import ipc from "./ipc";
import * as styles from "./styles";

function Home() {
  const { browsers } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const entries: any = Object.entries(browsers);
  const handleRegister = (location: string = "about:blank") => {
    dispatch(
      REGISTER({
        id: str.random(),
        location,
        action: "register",
      })
    );
  };

  const handleToolbar = () => {
    dispatch(TOOLBAR());
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
    ipc.on("app.add.browser", () => {
      handleRegister();
    });
    ipc.on("app.view.toolbar", handleToolbar);

    return () => {
      ipc.removeListener("app.add.browser", handleRegister);
      ipc.removeListener("app.view.toolbar", handleToolbar);
    };
  };
  useEffect(init, []);
  return (
    <div css={styles.container}>
      {entries.length ? (
        <div css={styles.row}>
          {entries.map(([key, value]: any, i: number) => {
            return (
              <div
                css={styles.col}
                key={i}
                style={{ ...(position[entries.length - 1][i] as any) }}
              >
                <Webview value={value} />
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
