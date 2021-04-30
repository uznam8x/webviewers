import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Webview from "~/components/Webview";
import { RootState } from "~/store";
import { REGISTER } from "~/store/browsers";
import { TOOLBAR, STATUSBAR, ACTIVATE } from "~/store/view";
import RGL, { WidthProvider, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import ipc from "./ipc";
import * as styles from "./styles";
import store from "~/store";
import { useWindowSize } from "react-use";
import { str } from "./utils";
import event from "~/event";
import * as R from "ramda";
const GridLayout = WidthProvider(RGL);

function getLayouts() {
  let ls = JSON.parse(window.localStorage.getItem("__LAYOUT__") || "[]");
  return ls;
}

function save(value: any) {
  window.localStorage.setItem("__LAYOUT__", JSON.stringify(value));
}

function getPosition(model: Layout[]) {
  let raw: string = R.pipe<any, any, any>(
    R.liftN(2, (...args: number[]) => args.reverse().join(""))([0, 1]),
    R.join(",")
  )([0, 1, 2, 3]);

  const fill = (num: number, len: number) =>
    Array(len)
      .fill(num)
      .map((v, i) => v + i);

  R.forEach((item: Layout) => {
    const x = fill(item.x, item.w);
    const y = fill(item.y, item.h);
    const res = R.liftN(2, (...args: string[]) => args.reverse().join(""))(
      y,
      x
    );
    raw = R.reduce<string, string>((a, b) => a.replace(b, "xx"), raw)(res);
  })(model);

  const res = R.pipe(R.reject((v) => v === "xx"))(raw.split(","));

  let [x, y] = [-1, -1];
  if (res.length) {
    [x, y] = R.pipe(R.head, R.split(""), R.map(parseInt))(res);
  }
  return { x, y };
}
function Home() {
  const { browsers } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [layout, setLayout] = useState(getLayouts());
  const size = useWindowSize();

  const handleRegister = () => {
    let res = R.innerJoin(
      (record: any, query: any) => record.y === query.y,
      layout,
      [{ y: 0 }]
    );

    let y1: any = R.repeat(4, 0);
    res.forEach((item) => {
      y1 = R.pipe<any, any, any, any>(
        R.remove(item.x, item.w),
        R.insert(item.x, R.repeat(1, item.w)),
        R.flatten
      )(y1);
    });

    const { x, y } = getPosition(layout);

    if (x === -1 && y === -1) {
      alert("There is not enough of space.");
      return;
    }

    const id = str.random();
    setLayout((items: any) => [...items, { i: id, x, y, w: 1, h: 1 }]);

    dispatch(
      REGISTER({
        location: "about:blank",
        id,
      })
    );
  };

  const handleToolbar = () => {
    dispatch(TOOLBAR());
  };
  const handleStatusbar = () => {
    dispatch(STATUSBAR());
  };
  const handleClearCache = () => {
    window.localStorage.setItem("__BROWSERS__", JSON.stringify([]));
    window.localStorage.setItem("__LAYOUT__", JSON.stringify([]));
    window.location.reload();
  };

  const sort = (model: any, query: any) =>
    R.pipe(
      R.innerJoin((record: any, query: any) => record.y === query.y, model),
      R.sort((a: any, b: any) => a.x - b.x)
    )([query]);

  const handleLayoutChange = (frames: any) => {
    const y1 = sort(frames, { y: 0 });
    const y2 = sort(frames, { y: 1 });
    const sorted = [...y1, ...y2];

    save(sorted);
    setLayout(() => sorted);

    setTimeout(event, 100, "ARRANGE", sorted);
  };

  const handleJumpAddress = () => {
    const frame = store.getState().view.activate;
    const el: HTMLInputElement | null = document.querySelector(
      `[data-frame="${frame}"] .webview__toolbar__search`
    );
    if (el) {
      el.select();
    }
  };

  const handleActivate = (e: any, params: { index: number }) => {
    const id = layout[params.index].i;
    dispatch(ACTIVATE(id));
  };

  const init = () => {
    ipc.on("app.add.browser", handleRegister);
    ipc.on("app.tools.tool_bar", handleToolbar);
    ipc.on("app.tools.status_bar", handleStatusbar);
    ipc.on("app.tools.clear_cache", handleClearCache);
    ipc.on("app.file.jump_address", handleJumpAddress);
    ipc.on("app.file.activate", handleActivate);

    return () => {
      ipc.removeListener("app.add.browser", handleRegister);
      ipc.removeListener("app.tools.tool_bar", handleToolbar);
      ipc.removeListener("app.tools.status_bar", handleToolbar);
      ipc.removeListener("app.tools.clear_cache", handleClearCache);
      ipc.removeListener("app.file.jump_address", handleJumpAddress);
      ipc.removeListener("app.file.activate", handleActivate);
    };
  };
  useEffect(init, [layout, browsers]);

  const reDraw = () => {
    setTimeout(setLayout, 100, getLayouts());
    return () => {};
  };
  useEffect(reDraw, [browsers]);

  return (
    <div css={styles.container}>
      {browsers.length ? (
        <div css={styles.row}>
          <GridLayout
            cols={4}
            layout={layout}
            margin={[1, 1]}
            rowHeight={(size.height - 2) / 2}
            onLayoutChange={handleLayoutChange}
            isBounded={true}
            draggableHandle=".react-dragable-handle"
          >
            {browsers.map((frame: any, i: number) => {
              return (
                <div
                  css={styles.col}
                  key={frame.id}
                  data-grid={layout[i]}
                  data-frame={frame.id}
                >
                  <Webview value={frame} />
                </div>
              );
            })}
          </GridLayout>
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
