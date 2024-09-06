import { CSSProperties } from "react";
import { ITableHeaderComponentProps } from "./TableHeaderComponent";
import { uniqueId } from "lodash-es";

export const TABLE_HEADER_NODE_TYPE = "tableHeaderNode";

export interface TableHeaderNode {
  id: string;
  type?: "tableHeaderNode";
  data?: ITableHeaderComponentProps;
  position: TPosition;
  style?: CSSProperties;
  extend: "parent";
  parentId: string;
  draggable?: boolean;
}

export function genTableHeaderNode(
  node: Omit<TableHeaderNode, "type" | "id">,
  cardNodeId: string
) {
  return {
    ...node,
    id: cardNodeId + "_tableheader_" + uniqueId(),
    type: TABLE_HEADER_NODE_TYPE,
    draggable: false,
    zIndex: 3,
  };
}
