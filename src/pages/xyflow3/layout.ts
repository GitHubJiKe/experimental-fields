import { Position } from "@xyflow/react";
import { layoutFromMap } from "entitree-flex";

const nodeWidth = 250;
const nodeHeight = 250;

const Orientation = {
  Vertical: "vertical",
  Horizontal: "horizontal",
};

const entitreeSettings = {
  clone: true, // returns a copy of the input, if your application does not allow editing the original object
  enableFlex: true, // has slightly better perfomance if turned off (node.width, node.height will not be read)
  firstDegreeSpacing: 50, // spacing in px between nodes belonging to the same source, eg children with same parent
  nextAfterAccessor: "spouses", // the side node prop used to go sideways, AFTER the current node
  nextAfterSpacing: 50, // the spacing of the "side" nodes AFTER the current node
  nextBeforeAccessor: "siblings", // the side node prop used to go sideways, BEFORE the current node
  nextBeforeSpacing: 50, // the spacing of the "side" nodes BEFORE the current node
  nodeHeight, // default node height in px
  nodeWidth, // default node width in px
  orientation: Orientation.Vertical, // "vertical" to see parents top and children bottom, "horizontal" to see parents left and
  rootX: 0, // set root position if other than 0
  rootY: 0, // set root position if other than 0
  secondDegreeSpacing: 50, // spacing in px between nodes not belonging to same parent eg "cousin" nodes
  sourcesAccessor: "parents", // the prop used as the array of ancestors ids
  sourceTargetSpacing: 50, // the "vertical" spacing between nodes in vertical orientation, horizontal otherwise
  targetsAccessor: "children", // the prop used as the array of children ids
};

export const layoutElements = (tree, rootId, _nodes, _edges) => {
  const { nodes: entitreeNodes, rels: entitreeEdges } = layoutFromMap(
    rootId,
    tree,
    {
      ...entitreeSettings,
      orientation: Orientation.Horizontal,
    }
  );

  const nodes = [];

  entitreeNodes.forEach((node) => {
    const newNode = { draggable: false };

    // newNode.sourcePosition = Position.Right;
    // newNode.targetPosition = Position.Left;

    newNode.data = { direction: "LR", ...node.data };
    newNode.id = node.id;
    newNode.type = "custom";

    newNode.hidden = node.hidden;
    newNode.deletable = node.deletable;

    newNode.width = nodeWidth;
    newNode.height = nodeHeight;

    newNode.position = {
      x: node.x,
      y: node.y,
    };

    nodes.push(newNode);
  });

  return {
    nodes: nodes,
    edges: _edges,
  };
};
