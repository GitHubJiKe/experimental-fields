import React from "react";
import "./style.scss";
import { isUndefined } from "lodash-es";
import { Icon } from "@ss/mtd-react";
type TAlign = "center" | "left" | "right";
type TOrder = "asc" | "desc" | "";

export interface IColumn {
  dataKey: string;
  label: string;
  search?: boolean;
  sort?: boolean;
  formatter?: (col: IColumn, row: IRow) => string | React.ReactNode;
  align?: TAlign;
  order?: TOrder;
}

export interface IRow {
  [x: string]: unknown;
}

interface EasyTableProps {
  columns: IColumn[];
  rows: IRow[];
  color: string;
  width?: number;
  children?: React.ReactNode;
  maxShowRowCount?: number;
  fixedTopRowCount?: number;
  autoHeight?: boolean;
  onRowClick?: (row: IRow, index: number) => void;
  onSort?: (col: IColumn) => void;
  onSearch?: (col: IColumn) => void;
}

function getJustifyContentByAlign(align?: TAlign) {
  switch (align) {
    case "center":
      return "center";
    case "left":
      return "flex-start";
    case "right":
      return "flex-end";
    default:
      return "flex-start";
  }
}

const ROW_HEIGHT = 24;

function EasyTable({
  columns,
  rows,
  color,
  width,
  children,
  maxShowRowCount,
  fixedTopRowCount,
  onRowClick,
  onSort,
  onSearch,
  autoHeight,
}: EasyTableProps) {
  const tableContentHeight =
    ROW_HEIGHT * (autoHeight ? maxShowRowCount! || rows.length : rows.length);
  const handleRowClick = (row: IRow, index: number) => {
    if (onRowClick) {
      onRowClick(row, index);
    }
  };

  console.log("render easy table");

  const handleSortClick = (col: IColumn) => {
    if (onSort) {
      if (col.order === "" || isUndefined(col.order)) {
        col.order = "asc";
      } else if (col.order === "asc") {
        col.order = "desc";
      } else if (col.order === "desc") {
        col.order = "";
      }
      onSort(col);
    }
  };

  const handleSearchClick = (col: IColumn) => {
    if (onSearch) {
      onSearch(col);
    }
  };

  return (
    <div className="easy-table-container" style={{ borderColor: color, width }}>
      <div className="header">{children}</div>
      <div className="easy-table">
        <div className="header">
          {columns.map((col) => {
            return (
              <div
                key={col.dataKey}
                className="column"
                style={{ justifyContent: getJustifyContentByAlign(col.align) }}
              >
                {col.label}
                {col.search && (
                  <div
                    onClick={() => handleSearchClick(col)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: 2,
                    }}
                  >
                    <Icon type="search" />
                  </div>
                )}
                {col.sort && (
                  <div
                    onClick={() => handleSortClick(col)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: 2,
                    }}
                  >
                    <Icon type="sort" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="content" style={{ height: tableContentHeight }}>
          {rows.map((row, idx) => {
            const cells = columns.map((col) => {
              const content = (
                col.formatter ? col.formatter(col, row) : row[col.dataKey]
              ) as React.ReactNode;
              return (
                <div
                  className="cell"
                  key={col.dataKey}
                  style={{
                    justifyContent: getJustifyContentByAlign(col.align),
                  }}
                >
                  {content}
                </div>
              );
            });
            const fixed = idx < (fixedTopRowCount || -Infinity);
            const position = fixed ? "absolute" : "relative";
            const top = fixed
              ? (idx + 1) * ROW_HEIGHT
              : fixedTopRowCount! * ROW_HEIGHT - 4;
            const zIndex = fixed ? 0 : 0;
            return (
              <div
                className="row"
                key={idx}
                style={{
                  position,
                  width: width ? width - 8 : "auto",
                  top,
                  zIndex,
                  backgroundColor: fixed ? "#dfecfd" : "#fff",
                  paddingRight: 8,
                }}
                onClick={() => handleRowClick(row, idx)}
              >
                {cells}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type TableComCons = (props: EasyTableProps) => JSX.Element;

type TableCom = TableComCons & {
  sayHello: () => void;
};

const EasyTableCom = EasyTable as TableCom;

EasyTableCom.sayHello = () => {
  console.log("hello");
};

export default EasyTableCom;
