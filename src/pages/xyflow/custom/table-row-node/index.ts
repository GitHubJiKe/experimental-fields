import { CSSProperties } from "react";
import { ITableRowComponentProps } from "./TableRowComponent";
import { uniqueId } from "lodash-es";
import type { Node } from "@xyflow/react";

export const TABLE_ROW_NODE_TYPE = "tableRowNode";

export interface TableRowNode {
  id: string;
  type?: "tableRowNode";
  data?: ITableRowComponentProps;
  position: TPosition;
  style?: CSSProperties;
  extend: "parent";
  parentId?: string;
  draggable?: boolean;
}

export function genTableRowNode(
  node: Omit<TableRowNode, "type" | "id">,
  cardNodeId: string
) {
  return {
    ...node,
    id: cardNodeId + "_tablerow_" + uniqueId(),
    type: TABLE_ROW_NODE_TYPE,
    draggable: false,
    zIndex: -1,
    parentId: cardNodeId,
    deletable: false,
  };
}
