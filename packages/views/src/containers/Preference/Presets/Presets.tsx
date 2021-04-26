import { RestOutlined } from "@ant-design/icons";
import { Avatar, Checkbox, Input, List, Modal, Select, Tabs } from "antd";
import * as R from "ramda";
import { memo, useEffect, useState } from "react";
import { str } from "~/utils";
import * as styles from "./styles";
const { TabPane } = Tabs;
const { Option } = Select;
export type Props = {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
};

const db = (window as any).database;
const { presets, config } = db;
let initialPanes: any[] = [];

function Presets({ className = "", css = {}, children, ...args }: Props) {
  const [protocol, setProtocol] = useState("https://");
  const [text, setText] = useState("");

  const [base, setBase] = useState("");
  const [tabName, setTabName] = useState("");
  const [isVisible, setVisible] = useState(false);
  const [panes, setPanes] = useState<any>(initialPanes);
  const [active, setActive] = useState<any>();

  const handleAdd = () => {
    const res = {
      title: tabName,
      content: [],
      key: str.random(),
      createAt: +new Date(),
    };
    setPanes([...panes, res]);
    presets.insert(res);
    setTabName("");
    setVisible(false);
  };

  const handleInput = (value: any) => {
    const idx = R.findIndex((v: any) => v.key === active)(panes);
    const res = panes[idx];
    let url = `${protocol}${value}`;

    const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
    if (regex.test(url)) {
      const content = [...res.content, url];
      presets.update({ key: active }, { $set: { content } });
      setPanes(R.update(idx, { ...res, content })(panes));
      setText("");
    }
  };
  const handleRemove = () => {};
  const handleChange = (key: any) => {
    setActive(key);
  };
  const handleEidt = (key: any, action: any) => {
    if (action === "add") {
      setTabName("");
      setVisible(true);
    }
    if (action === "remove") handleRemove();
  };

  const handleCheck = (value: string, { target }: any) => {
    if (target.checked) {
      setBase(value);
      config.update({ key: "preset" }, { $set: { value } });
    }
  };

  const init = () => {
    presets.find({}, (err: any, res: any) => {
      const item = {
        title: "Default",
        content: [],
        key: "default",
        closable: false,
        createAt: +new Date(),
      };
      if (res.length) {
        setPanes(R.sort((a: any, b: any) => a.createAt - b.createAt)(res));
      } else {
        presets.insert(item);
        setPanes([item]);
      }
    });

    config.find({}, function (err: any, res: any) {
      let value = "default";
      const item = R.find((v: any) => v.key === "preset")(res);
      if (item) {
        value = item.value;
      } else {
        config.insert({ key: "preset", value });
      }
      setActive(value);
      setBase(value);
    });

    //presets.update({ key: "default" }, { $set: { content: ['https://m.naver.com'] } }, {});
  };
  useEffect(init, []);
  return (
    <div css={styles.container} {...args}>
      <Input.Search
        addonBefore={
          <Select
            defaultValue={protocol}
            onChange={(value) => {
              setProtocol(value);
            }}
          >
            <Option value="https://">https://</Option>
            <Option value="http://">http://</Option>
          </Select>
        }
        allowClear
        onPressEnter={({ target }: any) => handleInput(target.value)}
        onSearch={handleInput}
        enterButton="ADD"
        placeholder=" "
        size="large"
        value={text}
        onInput={({ target }: any) => setText(target.value)}
      ></Input.Search>

      <Tabs
        type="editable-card"
        onChange={handleChange}
        activeKey={active}
        onEdit={handleEidt}
        style={{ marginTop: 16 }}
      >
        {panes.map((pane: any) => (
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            <List
              size="small"
              dataSource={pane.content}
              renderItem={(item: any) => (
                <List.Item
                  actions={[
                    <a key="list-loadmore-edit" onClick={handleRemove}>
                      <RestOutlined />
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar size="small" src={`${item}/favicon.ico`} />}
                    title={item}
                  />
                </List.Item>
              )}
              style={{ backgroundColor: "#fff" }}
            />
            <div style={{ marginTop: 16 }}>
              <Checkbox
                checked={base === pane.key}
                onChange={handleCheck.bind(null, pane.key)}
              >
                Current set as default
              </Checkbox>
            </div>
          </TabPane>
        ))}
      </Tabs>
      <Modal
        visible={isVisible}
        title="Tab name"
        onOk={handleAdd}
        onCancel={() => setVisible(false)}
        destroyOnClose
      >
        <Input
          autoFocus
          value={tabName}
          onPressEnter={handleAdd}
          onInput={({ target }: any) => {
            setTabName(target.value);
          }}
        ></Input>
      </Modal>
    </div>
  );
}

export default memo(Presets);
