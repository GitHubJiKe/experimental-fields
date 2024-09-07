// @ts-nocheck
import { Position } from "@xyflow/react";
import { layoutFromMap } from "entitree-flex";
import { flatten, uniqueId } from "lodash-es";

const nodeWidth = 400;
const nodeHeight = 300;

const Orientation = {
  Vertical: "vertical",
  Horizontal: "horizontal",
};

const entitreeSettings = {
  clone: true, // returns a copy of the input, if your application does not allow editing the original object
  enableFlex: true, // has slightly better perfomance if turned off (node.width, node.height will not be read)
  firstDegreeSpacing: 100, // spacing in px between nodes belonging to the same source, eg children with same parent
  nextAfterAccessor: "spouses", // the side node prop used to go sideways, AFTER the current node
  nextAfterSpacing: 100, // the spacing of the "side" nodes AFTER the current node
  nextBeforeAccessor: "siblings", // the side node prop used to go sideways, BEFORE the current node
  nextBeforeSpacing: 100, // the spacing of the "side" nodes BEFORE the current node
  nodeHeight, // default node height in px
  nodeWidth, // default node width in px
  orientation: Orientation.Vertical, // "vertical" to see parents top and children bottom, "horizontal" to see parents left and
  rootX: 0, // set root position if other than 0
  rootY: 0, // set root position if other than 0
  secondDegreeSpacing: 100, // spacing in px between nodes not belonging to same parent eg "cousin" nodes
  sourcesAccessor: "parents", // the prop used as the array of ancestors ids
  sourceTargetSpacing: 100, // the "vertical" spacing between nodes in vertical orientation, horizontal otherwise
  targetsAccessor: "children", // the prop used as the array of children ids
};

const { Top, Bottom, Left, Right } = Position;

export const layoutElements = (tree, rootId, direction = "TB") => {
  const isTreeHorizontal = direction === "LR";

  const { nodes: entitreeNodes, rels: entitreeEdges } = layoutFromMap(
    rootId,
    tree,
    {
      ...entitreeSettings,
      orientation: isTreeHorizontal
        ? Orientation.Horizontal
        : Orientation.Vertical,
    }
  );

  const nodes = [],
    edges = [];
  entitreeNodes.forEach((node) => {
    const newNode = {};

    newNode.sourcePosition = isTreeHorizontal ? Right : Bottom;
    newNode.targetPosition = isTreeHorizontal ? Left : Top;

    newNode.data = { label: node.name, direction, ...node };
    newNode.id = node.id;
    newNode.type = "custom";

    newNode.width = nodeWidth;
    newNode.height = nodeHeight;

    newNode.position = {
      x: node.x,
      y: node.y,
    };

    nodes.push(newNode);
  });
  const _edges_ = Object.keys(tree).map((key) => {
    const item = tree[key];
    const { children, dataSource, id } = item;
    let _edges = [];
    if (children && children.length) {
      _edges = children.map((child, idx) => {
        console.log(dataSource[idx]);
        const { key } = dataSource[idx];
        return {
          source: id,
          sourceHandle: key + "right",
          target: child,
          targetHandle: child,
        };
      });
    }

    return _edges;
  });

  return {
    nodes,
    edges: flatten(_edges_).map((v) => {
      return { ...v, id: uniqueId("edge_") };
    }),
  };
};
