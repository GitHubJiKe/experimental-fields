import { ReactNode } from "react";
import { uniqueId } from "lodash-es";
import { genCardNode } from "./custom/card-node";
import { genTableBarNode } from "./custom/table-bar-node";
import { genTableHeaderNode } from "./custom/table-header-node";
import { genTableRowNode } from "./custom/table-row-node";
import { genCardHandleNode } from "./custom/card-handle-node";
import { COLOR_MAP } from "./constant";
export interface NodeShape {
  id: string;
  type?: string;
  data: { label: string | ReactNode };
  position: { x: number; y: number };
}

const cardNodeWidth = 300,
  cardNodeHeight = 200,
  cardNodeGap = 200;

const cardNode = genCardNode({
  id: "1",
  data: {
    level: 0,
    color: COLOR_MAP.BLUE,
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
    },
    position: { x: 2, y: 2 },
    parentId: "1",
    extend: "parent",
    style: {
      width: 296,
    },
  },
  cardNode.id
);

const commomColRender = (row: Row, col: Column) => {
  const val = row[col.field] as number;

  if (val > 0) {
    return <label style={{ color: "green" }}>{val}</label>;
  }

  return <label style={{ color: "red" }}>{val}</label>;
};

const columns: Column[] = [
  { label: "城市1视角", field: "city", searchable: true },
  {
    label: "本期值",
    field: "cur",
    sortable: true,
    align: "right",
    render: commomColRender,
  },
  {
    label: "贡献值",
    field: "con",
    sortable: true,
    align: "right",
    render: commomColRender,
  },
];
const tableheaderNode = genTableHeaderNode(
  {
    data: {
      columns,
    },
    position: { x: 2, y: 48 },
    parentId: "1",
    extend: "parent",
    style: {
      width: 296,
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
    },
    position: {
      x: 2,
      y: 46 + 48,
    },
    parentId: "1",
    extend: "parent",
    style: {
      width: 296,
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
    },
    position: {
      x: 2,
      y: 46 + 48 + 31,
    },
    parentId: "1",
    extend: "parent",
    style: {
      width: 296,
    },
  },
  cardNode.id
);

const cardNode2 = genCardNode({
  id: "2",
  data: { level: 1, color: "yellow" },
  position: { x: 500, y: 10 },
  style: {
    borderColor: "yellow",
    width: cardNodeWidth,
    height: cardNodeHeight,
    backgroundColor: "#fff",
    outlineColor: "transparent",
    boxShadow: "none",
  },
});
// const cardhandleNode2 = genCardHandleNode("2", { x: 0, y: 145 });
const tabbarNode2 = genTableBarNode(
  {
    data: {
      color: "blue",
      dataSource: [],
    },
    position: { x: 2, y: 2 },
    parentId: "2",
    extend: "parent",
    style: {
      width: 296,
    },
  },
  cardNode2.id
);
const tableheaderNode2 = genTableHeaderNode(
  {
    data: {
      columns,
    },
    position: { x: 2, y: 48 },
    parentId: "2",
    extend: "parent",
    style: {
      width: 296,
    },
  },
  cardNode2.id
);
const tablerowNode2 = genTableRowNode(
  {
    data: {
      columns,
      row: {
        city: "成都",
        cur: -12,
        con: 24,
      },
      selected: false,
    },
    position: {
      x: 2,
      y: 46 + 48,
    },
    parentId: "2",
    extend: "parent",
    style: {
      width: 296,
    },
  },
  cardNode2.id
);
export const initialNodes = [
  cardNode,
  // cardhandleNode,
  tabbarNode,
  tableheaderNode,
  tablerowNode,
  tablerowNode11,
  // cardNode2,
  // cardhandleNode2,
  // tabbarNode2,
  // tableheaderNode2,
  // tablerowNode2,
];

export function createCardNodeGroup(
  level: number,
  color: string,
  siblings: number
) {
  const cardNodeId = uniqueId("new");
  const cardNode = genCardNode({
    id: cardNodeId,
    data: {
      level,
      color,
    },
    position: {
      x: cardNodeWidth + level * cardNodeGap,
      y: 10 + siblings * (cardNodeHeight + 40),
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
  const cardhandleNode = genCardHandleNode(cardNodeId, { x: 0, y: 145 });
  const tabbarNode = genTableBarNode(
    {
      data: {
        color,
        dataSource: [],
      },
      position: { x: 2, y: 2 },
      parentId: cardNodeId,
      extend: "parent",
      style: {
        width: 296,
      },
    },
    cardNode.id
  );
  const tableheaderNode = genTableHeaderNode(
    {
      data: {
        columns,
      },
      position: { x: 2, y: 48 },
      parentId: cardNodeId,
      extend: "parent",
      style: {
        width: 296,
      },
    },
    cardNodeId
  );
  return [cardNode, cardhandleNode, tabbarNode, tableheaderNode];
}
