import { CSSProperties } from "react";
import { Node } from "@xyflow/react";
type CardNodeData = { level: number; color: string, groupId: number | string };

export interface CardNode {
  id: string;
  type: "group";
  data?: CardNodeData;
  position: TPosition;
  style?: CSSProperties;
  parentId?: string
}

export function genCardNode(node: Omit<CardNode, "type">): Node<CardNodeData> {
  return {
    ...node,
    type: "group",
    zIndex: 0,
    extend: "parent"
  } as Node<CardNodeData>;
}
