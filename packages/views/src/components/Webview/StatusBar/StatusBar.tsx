import {
  DesktopOutlined,
  CompressOutlined,
  ExpandOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { memo, useContext } from "react";
import { useSelector } from "react-redux";
import context from "../context";
import { Row, Col } from "antd";
import * as R from "ramda";
import * as styles from "./styles";

export type Props = {
  [key: string]: any;
};

function StatusBar({ children, ...args }: Props) {
  const { view } = useSelector((state: any) => state);
  const { setStatus, ...status } = useContext(context);

  const handleDesktop = () => {
    const res = R.mergeDeepLeft({
      mode: status.mode === "mobile" ? "desktop" : "mobile",
    })(status);

    setStatus(res);
  };
  const handleFullscreen = () => {
    const res = R.mergeDeepLeft({
      isFullscreen: !status.isFullscreen,
    })(status);
    setStatus(res);
  };

  return view.statusbar ? (
    <div css={styles.container} {...args}>
      <Row align="middle" wrap={false}>
        <Col css={styles.loading}>
          <LoadingOutlined />
        </Col>
        <Col css={styles.title}>{status.title}</Col>
        <Col flex={1}></Col>
        <Col>
          <button
            type="button"
            css={[styles.button, styles.desktop(status.mode === "desktop")]}
            onClick={handleDesktop}
          >
            <DesktopOutlined />
          </button>
        </Col>
        <Col>
          <button
            type="button"
            css={[styles.button, styles.fullscreen(status.isFullscreen)]}
            onClick={handleFullscreen}
          >
            {status.isFullscreen ? <CompressOutlined /> : <ExpandOutlined />}
          </button>
        </Col>
      </Row>
    </div>
  ) : null;
}

export default memo(StatusBar);
