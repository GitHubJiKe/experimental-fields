import { genTableHeaderNode } from "../custom/table-header-node";
import { cardNodeWidth, cardNode } from "../node";

export const SET_NODE_EVENT = "SET_NODE_EVENT";
export const SET_EDGE_EVENT = "SET_EDGE_EVENT";

export const TOOGLE_MODAL = 'TOOGLE_MODAL'

export const COLOR_MAP = {
  BLUE: "#347BED",
  DEEP_ORANGE: "#F08605",
  GREEN: "#3DC29D",
  PURPLE: "#B167F5",
  BROWN: "#996960",
  QING: "#8FA44D",
  YELLOW: "#EDAA00",
  PINK: "#EE8594",
  SKYBLUE: "#42A9D4",
  FADEPURPLE: "#6E79B1",
};


const commomColRender = (row: Row, col: Column) => {
  const val = row[col.field] as number;

  if (val > 0) {
    return <label style={{ color: "green" }}>{val}</label>;
  }

  return <label style={{ color: "red" }}>{val}</label>;
};
export const columns: Column[] = [
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
