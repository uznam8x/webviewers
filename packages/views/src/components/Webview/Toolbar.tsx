import {
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import { KeyboardEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  BACKWRD,
  DESTROY,
  BrowserType,
  FORWARD,
  LOCATION,
} from "~/store/browsers";
import * as styles from "./styles";

export type Props = {
  [key: string]: any;
  browser: BrowserType;
  onChange?: (value: any) => void;
};

function Toolbar({ children, browser, onChange = () => {}, ...args }: Props) {
  const { view } = useSelector((state: any) => state);
  const [text, setText] = useState<string>("");
  const [config, setConfig] = useState({ toolbar: { desktop: true } });
  const dispatch = useDispatch();
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (browser.location !== e.currentTarget.value)
        dispatch(
          LOCATION({
            [browser.id]: {
              location: ("https://" + e.currentTarget.value).replace(
                /http[s]?:\/\/(http[s]?:\/\/)(.+)/g,
                ($1, $2, $3) => $2 + $3
              ),
              action: "location",
            },
          })
        );
    }
  };

  const handleDesktop = (e: any) => {
    e.currentTarget.blur();
    setConfig((state) => ({
      ...state,
      toolbar: { ...state.toolbar, desktop: !state.toolbar.desktop },
    }));
  };

  const handleConfig = () => {
    onChange(config);
    return () => {};
  };
  useEffect(handleConfig, [config]);

  const handleTextSync = () => {
    if (text !== browser.location) setText(browser.location);
    return () => {};
  };
  useEffect(handleTextSync, [browser.location]);

  return (
    <div>
      {view.toolbar && (
        <div css={styles.toolbar}>
          <Row gutter={4}>
            <Col>
              <Button
                shape="circle"
                css={styles.toolbarBackward}
                disabled={!browser.canBackward}
                onClick={() => dispatch(BACKWRD(browser))}
              >
                <LeftOutlined />
              </Button>
            </Col>
            <Col>
              <Button
                shape="circle"
                css={styles.toolbarForward}
                disabled={!browser.canForward}
                onClick={() => dispatch(FORWARD(browser))}
              >
                <RightOutlined />
              </Button>
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
              <Button
                css={styles.toolbarDesktop(config.toolbar.desktop)}
                shape="circle"
                onClick={handleDesktop}
              >
                <DesktopOutlined />
              </Button>
            </Col>
            <Col>
              <Button
                css={styles.toolbarClose}
                shape="circle"
                onClick={() => dispatch(DESTROY(browser))}
              >
                <CloseOutlined />
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Toolbar;
