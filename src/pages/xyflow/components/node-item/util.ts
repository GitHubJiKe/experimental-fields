import { uniqueId } from "lodash-es";
import { Node } from "@xyflow/react";
export function createNodeItem(position: { x: number; y: number }): Node {
  return {
    id: uniqueId("nodeitem_"),
    type: "nodeItem",
    position,
  } as Node;
}
