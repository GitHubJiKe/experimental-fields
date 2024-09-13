import { Node } from "@xyflow/react";
import { IColumn, mockColumns, mockData, RowData } from "./mock";
import EventEmitter from "eventemitter3";

export function fetchTableData(
  id: string
): Promise<{ data: RowData[]; columns: IColumn[] }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: mockData.map((item) => {
          return { ...item, id: item.id + "_" + id };
        }),
        columns: mockColumns,
      });
    }, 3000);
  });
}

export const initNodes = [
  {
    type: "custom",
    data: {
      id: 1,
      label: null,
    },
    position: { x: 10, y: 10 },
    id: "1",
    widht: 250,
    height: 250,
    deletable: false,
  },
] as unknown as Node[];
export const initEdges = [];

export const eventBus = new EventEmitter();
