export interface RowData {
  name: string;
  age: number;
  id: string | number;
  key: string | number;
}
export const mockData: RowData[] = [
  { name: "小明", age: 12, id: 1, key: 1 },
  { name: "小红", age: 22, id: 2, key: 2 },
  { name: "小明22", age: 12, id: 11, key: 11 },
  { name: "小红33", age: 22, id: 22, key: 22 },
];
export const mockData2: RowData[] = [
  { name: "小明", age: 12, id: 11, key: 11 },
  { name: "小红", age: 22, id: 22, key: 22 },
];

export interface IColumn {
  label: string;
  dataKey: string;
}

export const mockColumns = [
  {
    label: "ID",
    dataKey: "id",
  },
  {
    label: "姓名",
    dataKey: "name",
  },
  {
    label: "年龄",
    dataKey: "age",
  },
];
