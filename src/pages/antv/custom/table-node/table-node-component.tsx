import { Node } from "@antv/x6";

export interface IColumn {
  label: string;
  field: string;
}

export interface IRow {
  [x: string]: unknown;
}

export interface IData {
  rows: IRow[];
  columns: IColumn[];
}

export default function TableNodeComponent({ node }: { node: Node }) {
  const { columns } = node.getData() as IData;
  return (
    <div style={{ backgroundColor: "#fff", padding: 12 }}>
      <div style={{ display: "flex" }}>
        {columns.map((col) => (
          <div key={col.field} style={{ flex: 1 }}>
            {col.label}
          </div>
        ))}
      </div>
    </div>
  );
}
