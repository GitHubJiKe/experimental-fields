import { ReactNode } from "react";
import { uniqueId } from "lodash-es";
import { genCardNode } from "./custom/card-node";
import { genTableBarNode } from "./custom/table-bar-node";
import { genTableHeaderNode } from "./custom/table-header-node";
import { genTableRowNode } from "./custom/table-row-node";
import { genCardHandleNode } from "./custom/card-handle-node";
import { COLOR_MAP, columns } from "./constant";
import type { Node } from "@xyflow/react";
export interface NodeShape {
  id: string;
  type?: string;
  data: { label: string | ReactNode };
  position: { x: number; y: number };
}

export const cardNodeWidth = 300,
  cardNodeHeight = 300,
  cardNodeGap = 400;

export const cardNode = genCardNode({
  id: "1",
  data: {
    level: 0,
    color: COLOR_MAP.BLUE,
    groupId: 1
  },
  position: { x: 10, y: 10 },
});
cardNode.style = {
  borderColor: COLOR_MAP.BLUE,
  width: cardNodeWidth,
  height: cardNodeHeight,
  backgroundColor: "#fff",
  outlineColor: "transparent",
  boxShadow: "none",
};

// const cardhandleNode = genCardHandleNode("1", { x: 0, y: 145 });
const tabbarNode = genTableBarNode(
  {
    data: {
      color: COLOR_MAP.BLUE,
      dataSource: [],
      groupId: 1
    },
    position: { x: 2, y: 2 },
    parentId: "1",
    extend: "parent",
    style: {
      width: cardNodeWidth - 4,
    },
  },
  cardNode.id
);

const tableheaderNode = genTableHeaderNode(
  {
    data: {
      columns,
      groupId: 1
    },
    position: { x: 2, y: 48 },
    parentId: "1",
    extend: "parent",
    style: {
      width: cardNodeWidth - 4,
    },
  },
  cardNode.id
);

const tablerowNode = genTableRowNode(
  {
    data: {
      columns,
      row: {
        city: "成都",
        cur: -12,
        con: 24,
      },
      selected: false,
      groupId: 1
    },
    position: {
      x: 2,
      y: 46 + 44,
    },
    parentId: "1",
    extend: "parent",
    style: {
      width: cardNodeWidth - 4,
    },
  },
  cardNode.id
);
const tablerowNode11 = genTableRowNode(
  {
    data: {
      columns,
      row: {
        city: "成都",
        cur: 18,
        con: -94,
      },
      selected: false,
      groupId: 1
    },
    position: {
      x: 2,
      y: 46 + 44 + 34,
    },
    parentId: "1",
    extend: "parent",
    style: {
      width: cardNodeWidth - 4,
    },
  },
  cardNode.id
);

export const initialNodes = [
  cardNode,
  tabbarNode,
  tableheaderNode,
  tablerowNode,
  tablerowNode11,
];

export function createCardNodeGroup(
  level: number,
  color: string,
  siblings: number,
  prevCardNode: Node,
  rowNodeId: string
) {
  const { position: { x, y }, width, height } = prevCardNode
  console.log('prevCardNode::', level, x, y, width, height, siblings);
  const cardNodeId = uniqueId("new");
  const cardNode = genCardNode({
    id: cardNodeId,
    parentId: rowNodeId,
    data: {
      level,
      groupId: rowNodeId,
      color,
    },
    position: {
      x: x + cardNodeGap,
      y: y + siblings * (cardNodeHeight + 40),
    },
    style: {
      borderColor: color,
      width: cardNodeWidth,
      height: cardNodeHeight,
      backgroundColor: "#fff",
      outlineColor: "transparent",
      boxShadow: "none",
    },
  });
  const cardhandleNode = genCardHandleNode(cardNodeId, { x: 0, y: 145 }, rowNodeId);
  const tabbarNode = genTableBarNode(
    {
      data: {
        color,
        dataSource: [],
        groupId: rowNodeId
      },
      position: { x: 2, y: 2 },
      extend: "parent",
      style: {
        width: cardNodeWidth - 4,
      },
    },
    cardNode.id
  );
  const tableheaderNode = genTableHeaderNode(
    {
      data: {
        columns,
        groupId: rowNodeId
      },
      position: { x: 2, y: 48 },
      extend: "parent",
      style: {
        width: cardNodeWidth - 4,
      },
    },
    cardNodeId
  );

  return [cardNode, cardhandleNode, tabbarNode, tableheaderNode];
}
