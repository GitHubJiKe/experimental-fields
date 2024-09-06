type TPosition = { x: number; y: number };

interface Row {
  [k: string]: unknown;
}

interface Column {
  label: string;
  field: string;
  searchable?: boolean;
  sortable?: boolean;
  align?: Align;
  widthProportion?: number;
  render?: (row: Row, col: Column) => string | React.ReactNode;
}

type Align = "center" | "left" | "right";
