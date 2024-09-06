import { CSSProperties } from "react";
import { Node } from "@xyflow/react";
type CardNodeData = { level: number; color: string };

export interface CardNode {
  id: string;
  type: "group";
  data?: CardNodeData;
  position: TPosition;
  style?: CSSProperties;
}

export function genCardNode(node: Omit<CardNode, "type">): Node<CardNodeData> {
  return {
    ...node,
    type: "group",
    zIndex: 0,
  } as Node<CardNodeData>;
}
