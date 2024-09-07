// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Input, Popover, Button } from "antd";
import { useRef, useState } from "react";
import { justifyContent } from "../utils";
import { CloseOutlined, SearchOutlined, SortAscendingOutlined } from "@ant-design/icons";
import { COLOR_MAP } from "../../constant";

export interface ITableHeaderComponentProps {
  columns: Column[];
  groupId: string | number
}
export default function TableHeaderComponent({
  data,
}: {
  data: ITableHeaderComponentProps;
}) {
  const { columns = [] } = data;
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  const onSearch = () => {
    console.log("do search");
  };

  const onReset = () => {
  };

  function SearchPane() {
    return (
      <div style={{ width: 160 }}>
        <Input style={{ marginTop: 6, backgroundColor: "#fff" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <Button onClick={onReset} size="small" type="text">
            重置
          </Button>
          <Button onClick={onSearch} type="primary" size="small">
            确定
          </Button>
        </div>
      </div>
    );
  }

  const popoverContainer = () => {
    return ref.current as unknown as HTMLDivElement;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f7f7f7",
        padding: 12,
      }}
    >
      {columns.map((col) => {
        return (
          <div
            key={col.field}
            style={{
              flex: col.widthProportion || 1,
              color: "#222222",
              display: "flex",
              alignItems: "center",
              justifyContent: justifyContent(col.align),
            }}
          >
            <label style={{ marginRight: 4, fontSize: 12 }}>{col.label}</label>
            {col.searchable && (
              <Popover
                placement="bottom"
                content={<SearchPane />}
                trigger="click"
              >
                <SearchOutlined style={{ fontSize: 12, position: 'relative', top: 1 }} onClick={() => setVisible(true)} />
              </Popover>
            )}
            {col.sortable && <SortAscendingOutlined style={{ color: COLOR_MAP.GREEN }} />}
          </div>
        );
      })}

      <div
        ref={ref}
        style={{ position: "relative", top: 20, left: -280, zIndex: 99999999 }}
      ></div>
    </div>
  );
}
