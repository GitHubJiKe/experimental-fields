// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { FileTextFilled, } from "@ant-design/icons";
import { Cascader, Tag } from "antd";
import { useRef } from "react";
import { eventBus } from "../utils";
import { TOOGLE_MODAL } from "../../constant";

export interface ITableBarComponentProps {
  color: string;
  dataSource: unknown;
  groupId: string | number
}
interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

export function TableBarComponent({ data }: { data: ITableBarComponentProps }) {
  const { dataSource, color } = data;
  const ref = useRef();

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
          placeholder="Please select"
          options={options}
          style={{ width: 150 }}
          getPopupContainer={() => ref.current}
          onClick={() => {
            eventBus.emit(TOOGLE_MODAL, true)
          }}
        />
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <FileTextFilled style={{ color: '#000' }} />
      </div>
      <div
        ref={ref}
        style={{ position: "relative", top: 20, left: -228, zIndex: 99999999 }}
      ></div>
    </div>
  );
}
