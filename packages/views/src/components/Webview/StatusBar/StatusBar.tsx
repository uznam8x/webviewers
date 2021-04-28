import {
  DesktopOutlined,
  CompressOutlined,
  ExpandOutlined,
} from "@ant-design/icons";
import { memo, useContext } from "react";
import { useSelector } from "react-redux";
import context from "../context";
import { Row, Col } from "antd";
import * as styles from "./styles";

export type Props = {
  [key: string]: any;
};

function StatusBar({ children, ...args }: Props) {
  const { view } = useSelector((state: any) => state);
  const { id, isLoading, isFullscreen, setStatus, ...status } = useContext(
    context
  );

  const handleDesktop = () => {
    setStatus({
      ...status,
      id,
      mode: status.mode === "mobile" ? "desktop" : "mobile",
    });
  };
  const handleFullscreen = () => {
    setStatus({
      ...status,
      id,
      isFullscreen: !isFullscreen,
    });
  };

  return view.statusbar ? (
    <div css={styles.container} {...args}>
      <Row align="middle" wrap={false}>
        <Col css={{ paddingLeft: 8 }}>
          {isLoading ? "loading..." : "loaded"}
        </Col>
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
            css={[styles.button, styles.fullscreen(isFullscreen)]}
            onClick={handleFullscreen}
          >
            {isFullscreen ? <CompressOutlined /> : <ExpandOutlined />}
          </button>
        </Col>
      </Row>
    </div>
  ) : null;
}

export default memo(StatusBar);
