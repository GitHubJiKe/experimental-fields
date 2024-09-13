import { register } from "@antv/x6-react-shape";
import { Table } from "@ss/mtd-react";

const Column = Table.Column;

const columns = [
  { dataKey: "name", label: "姓名" },
  { dataKey: "age", label: "年龄" },
];

const data = [
  { name: "小明", age: 12 },
  { name: "小红", age: 13 },
];

export default function NodeComponent() {
  return (
    <Table data={data}>
      {columns.map((col) => (
        <Column key={col.dataKey} dataKey={col.dataKey} label={col.label} />
      ))}
    </Table>
  );
}

register({
  shape: "custom-basic-react-node",
  width: 100,
  height: 100,
  component: NodeComponent,
});
