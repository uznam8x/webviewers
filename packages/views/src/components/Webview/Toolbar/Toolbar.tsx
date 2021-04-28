import {
  CloseOutlined,
  LeftOutlined,
  ReloadOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import { KeyboardEvent, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import context from "../context";
import * as styles from "./styles";

export type Props = {
  [key: string]: any;
  onChange?: (value: any) => void;
};

function Toolbar({ children, onChange = () => {}, ...args }: Props) {
  const {
    setStatus,
    goBackard,
    goForward,
    reload,
    destroy,
    ...status
  } = useContext(context);

  const { view } = useSelector((state: any) => state);
  const [text, setText] = useState<string>("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (status.location !== e.currentTarget.value) {
        const location = ("https://" + e.currentTarget.value).replace(
          /http[s]?:\/\/(http[s]?:\/\/)(.+)/g,
          ($1, $2, $3) => $2 + $3
        );

        setStatus({ id: status.id, mode: status.mode, location });
      }
    }
  };

  const handleTextSync = () => {
    if (text !== status.location) setText(status.location);
    return () => {};
  };
  useEffect(handleTextSync, [status.location]);

  return (
    <div>
      {view.toolbar && (
        <div css={styles.container}>
          <Row gutter={4} wrap={false}>
            <Col>
              <button
                type="button"
                css={styles.backward}
                disabled={!status.canBackward}
                onClick={goBackard}
              >
                <LeftOutlined />
              </button>
            </Col>
            <Col>
              <button
                type="button"
                css={styles.forward}
                disabled={!status.canForward}
                onClick={goForward}
              >
                <RightOutlined />
              </button>
            </Col>
            <Col>
              <button type="button" css={styles.reload} onClick={reload}>
                <ReloadOutlined />
              </button>
            </Col>
            <Col flex={1}>
              <Input
                css={styles.search}
                value={text}
                onInput={(e: any) => {
                  setText(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
            </Col>
            <Col>
              <button type="button" css={styles.close} onClick={destroy}>
                <CloseOutlined />
              </button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Toolbar;
