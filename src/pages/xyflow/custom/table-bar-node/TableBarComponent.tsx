// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Cascader, Icon, Tag } from "@ss/mtd-react";
import { useRef } from "react";

export interface ITableBarComponentProps {
  color: string;
  dataSource: unknown;
}

export function TableBarComponent({ data }: { data: ITableBarComponentProps }) {
  const { dataSource, color } = data;
  const ref = useRef();
  const popLayerContainer = () => {
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
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12 }}>
        <Tag color={color}>公式</Tag>
        <Cascader
          size="small"
          data={dataSource || []}
          style={{ width: 150 }}
          popLayer={{
            getContainer: popLayerContainer,
          }}
          onVisibleChange={(visible) => {
            if (visible) {
              setTimeout(() => {
                const wraper = document.querySelector(
                  ".mtd-cascader-popup-wrapper"
                );
                if (wraper) {
                  wraper.click();
                }
              }, 0);
            }
          }}
        />
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <Icon type="file-o" style={{ cursor: "pointer" }} />
      </div>
      <div
        ref={ref}
        style={{ position: "relative", top: 20, left: -228, zIndex: 99999999 }}
      ></div>
    </div>
  );
}
