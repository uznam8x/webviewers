import { AppstoreOutlined, CloseOutlined } from "@ant-design/icons";
import { Col, Menu, Row } from "antd";
import { memo, useEffect, useState } from "react";
import Presets from "./Presets";
import * as styles from "./styles";
export type Props = {
  [key: string]: any;
};

function Preference({ ...args }: Props) {
  const [visible, setVisible] = useState<boolean>(false);

  const handleVisible = () => {
    setVisible(true);
  };

  const listen = () => {
    // setTimeout(setVisible, 500, true);
    (window as any).ipc.on("app.preference", handleVisible);
    return () => {
      (window as any).ipc.removeListener("app.preference", handleVisible);
    };
  };

  useEffect(listen, []);
  return (
    <div
      css={styles.container}
      {...args}
      style={{ display: visible ? "block" : "none" }}
    >
      <div css={styles.header}>
        <Row align="middle">
          <Col flex={1}>
            <h2 css={styles.subject}>Preferences</h2>
          </Col>
          <Col>
            <button
              type="button"
              css={styles.close}
              onClick={setVisible.bind(null, false)}
            >
              <CloseOutlined />
            </button>
          </Col>
        </Row>
      </div>

      <div css={styles.content}>
        <Row gutter={16} style={{ width: "100%", flexWrap: "nowrap" }}>
          <Col xs={6}>
            <Menu onClick={() => {}} multiple mode="inline">
              <Menu.Item key="Presets" icon={<AppstoreOutlined />}>
                Presets
              </Menu.Item>
            </Menu>
          </Col>
          <Col xs={18}>
            <Presets />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default memo(Preference);
