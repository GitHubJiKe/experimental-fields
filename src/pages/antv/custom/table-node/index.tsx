import { register } from "@antv/x6-react-shape";
import TableNodeComponent, {
  IColumn,
  IData,
  IRow,
} from "./table-node-component";
import { Node } from "@antv/x6";
import TableRowComponent from "./table-row-component";
import { uniqueId } from "lodash-es";
export const TABLE_NODE_TYPE = "table-node";
export const TABLE_ROW_TYPE = "table-row";

register({
  shape: TABLE_NODE_TYPE,
  width: 300,
  effect: ["data"],
  component: TableNodeComponent,
});
register({
  shape: TABLE_ROW_TYPE,
  width: 300,
  effect: ["data"],
  component: TableRowComponent,
});

type Position = { x: number; y: number };

export function createTableNode({
  position,
  data,
}: {
  position: Position;
  data: IData;
}) {
  const id = uniqueId("tablenode_");
  return {
    id,
    shape: TABLE_NODE_TYPE,
    ...position,
    data: { columns: data.columns },
  };
}

export function createTableRowNode(row: IRow, columns: IColumn[]) {
  const id = uniqueId("tablerow_");
  return { id, shape: TABLE_ROW_TYPE, data: { row, columns } } as Node;
}

export default {
  TableNodeComponent,
  createTableNode,
  createTableRowNode,
  TABLE_NODE_TYPE,
  TABLE_ROW_TYPE,
};
