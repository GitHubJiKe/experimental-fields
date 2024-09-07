import { CSSProperties } from "react";
import { ITableBarComponentProps } from "./TableBarComponent";
import { uniqueId } from "lodash-es";

export const TABLE_BAR_NODE_TYPE = "tableBarNode";

export interface TableBarNode {
  id: string;
  type?: "tableBarNode";
  data?: ITableBarComponentProps;
  position: TPosition;
  style?: CSSProperties;
  extend: "parent";
  parentId?: string;
  draggable?: boolean;
}

export function genTableBarNode(
  node: Omit<TableBarNode, "type" | "id">,
  cardNodeId: string
) {
  return {
    ...node,
    id: cardNodeId + "_tablebar_" + uniqueId(),
    type: TABLE_BAR_NODE_TYPE,
    draggable: false,
    zIndex: 1,
    parentId: cardNodeId,
  };
}
