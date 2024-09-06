import { Position, XYPosition } from "@xyflow/react";

export function genCardHandleNode(cardNodeId: string, position: XYPosition) {
  return {
    id: `cardhandle_${cardNodeId}`,
    type: "output",
    draggable: false,
    parentId: cardNodeId,
    extend: "parent",
    position,
    width: 5,
    height: 5,
    targetPosition: Position.Left,
    zIndex: -1,
    style: {
      border: "none",
      backgroundColor: "transparent",
      borderColor: "blue",
      outlineColor: "transparent",
      boxShadow: "none",
    },
  };
}
