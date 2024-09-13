import { Node, Position } from "@xyflow/react";

interface CustomNode {
  id: string;
  parentId?: string;
  children?: string[];
  targetPosition: Position;
  data: Node["data"];
}

interface CustomRow {
  nodeId: string;
  id: string;
  sourcePosition: Position;
}

interface CustomEdge {
  id: string;
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
}
