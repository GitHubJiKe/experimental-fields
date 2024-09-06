// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Icon, Input, Popover, Button } from "@ss/mtd-react";
import { useRef, useState } from "react";
import { justifyContent } from "../utils";

export interface ITableHeaderComponentProps {
  columns: Column[];
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
    setVisible(false);
  };

  function SearchPane() {
    return (
      <div style={{ width: 160 }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Icon
            type="close"
            style={{
              position: "relative",
              top: -2,
              right: -2,
              cursor: "pointer",
            }}
            onClick={() => setVisible(false)}
          />
        </div>
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
            <label style={{ marginRight: 4 }}>{col.label}</label>
            {col.searchable && (
              <Popover
                placement="bottom"
                content={<SearchPane />}
                getContainer={popoverContainer}
                trigger="click"
                visible={visible}
                onDocumentClick={(_visible) => {
                  console.log(_visible);
                  if (_visible) {
                    setVisible(false);
                  }
                }}
              >
                <Icon type="search" onClick={() => setVisible(true)} />
              </Popover>
            )}
            {col.sortable && <Icon type="sort" />}
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
