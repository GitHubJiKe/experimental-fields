import { Edge, MarkerType } from "@xyflow/react";
import { uniqueId } from "lodash-es";

export function createEdge(source: string, target: string): Edge {
  return {
    id: `${source}_edge_${uniqueId()}`,
    source,
    target,
    type: "simplebezier",
    markerEnd: { type: MarkerType.Arrow },
    data: { groupId: source }
  };
}
