import { Node } from "@antv/x6";
import { IColumn, IRow } from "./table-node-component";

export default function TableRowComponent({ node }: { node: Node }) {
  const { row, columns } = node.getData() as { row: IRow; columns: IColumn[] };
  return (
    <div style={{ display: "flex", backgroundColor: "#fff", padding: 12 }}>
      {columns.map((col) => (
        <div key={col.field} style={{ flex: 1 }}>
          {row[col.field] as string}
        </div>
      ))}
    </div>
  );
}
