// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useMemo, useState } from "react";
import EasyTable, { IColumn, IRow } from "./easytable";
import { cloneDeep, isUndefined } from "lodash-es";
import { Button, Modal, Select } from "@ss/mtd-react";

const defaultRows = [
  { name: "小明", age: 20, height: 180 },
  { name: "小明1", age: 21, height: 181 },
  { name: "小明2", age: 22, height: 182 },
  { name: "小明3", age: 23, height: 183 },
  { name: "小明3000", age: 230, height: 183 },
];

export default function Index() {
  const [showCount] = useState(defaultRows.length);
  const [rows, setRows] = useState(defaultRows);
  const [modalOpen, setModalOpen] = useState(false);
  const columns = [
    {
      dataKey: "name",
      label: "姓名",
      align: "left",
      search: true,
    },
    {
      dataKey: "age",
      label: "年龄",
      align: "right",
      sort: true,
    },
    {
      dataKey: "height",
      label: "身高",
      align: "right",
      formatter: (col: IColumn, row: IRow) => {
        const val = row[col.dataKey] as string;

        return (
          <span
            style={{
              color: `${Number(val) > 182 ? "red" : "green"}`,
            }}
            className="last-cell"
          >
            {val}
          </span>
        );
      },
      sort: true,
    },
  ];
  const fixedCount = useMemo(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    () => rows.filter((v) => !isUndefined(v.selected)).length,
    [rows]
  );

  const onSort = (col: IColumn) => {
    console.log(col);
  };

  const onSearch = (col: IColumn) => {
    setModalOpen(true);
    console.log("search", col);
    EasyTable.sayHello();
  };
  return (
    <div lx-name="MV">
      <EasyTable
        autoHeight
        columns={columns as unknown as IColumn[]}
        rows={rows}
        color="#347BED"
        width={400}
        fixedTopRowCount={fixedCount}
        maxShowRowCount={showCount}
        onSort={onSort}
        onSearch={onSearch}
        onRowClick={(row, idx) => {
          if (!isUndefined(row.selected)) {
            return;
          }
          // setShowCount((v) => v + 1);
          console.log(JSON.stringify(row, null, 2), idx);
          const _rows = rows
            .filter((v) => !isUndefined(v.selected))
            .sort((a, b) => b.selected! - a.selected!);

          console.log(_rows);

          rows[idx]["selected"] = _rows.length ? _rows[0].selected + 1 : 0;
          setRows((v) => {
            const newRows = [
              ...v.sort((a, b) => {
                if (a.selected !== undefined && b.selected !== undefined) {
                  return a.selected - b.selected;
                } else if (a.selected !== undefined) {
                  return -1;
                } else if (b.selected !== undefined) {
                  return 1;
                } else {
                  return 0;
                }
              }),
            ];
            console.log(newRows);
            return cloneDeep(newRows);
          });
        }}
      >
        <div>
          <h1
            style={{ backgroundColor: "#f7f7f7", padding: "0 4px", margin: 0 }}
          >
            Easy Table
          </h1>
        </div>
      </EasyTable>
      <Modal open={modalOpen} closable>
        <Modal.Body>
          <div>
            <Select></Select>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Button size="small" onClick={() => setModalOpen(false)}>
                重置
              </Button>
              <Button size="small" type="primary">
                确定
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
