import { useState, useEffect, useRef } from "react";
import { eventBus, fetchTableData } from "./utils";
import { IColumn, RowData } from "./mock";
import { Icon, Table } from "@ss/mtd-react";
import {
  Handle,
  Position,
  useNodeId,
  useUpdateNodeInternals,
} from "@xyflow/react";
import { useFlowStore } from ".";
import { uniqueId } from "lodash-es";

const Column = Table.Column;

const dataMap = new Map();

export default function CustomNodeComponent({
  data,
}: {
  data: { id: string };
}) {
  const id = data.id;

  const [tableData, setData] = useState<RowData[]>([]);
  const [columns, setColumns] = useState<IColumn[]>([]);

  const nodeId = useNodeId();
  const nodes = useFlowStore((s) => s.nodes);
  const addEdge = useFlowStore((s) => s.addEdge);
  const updateNode = useFlowStore((s) => s.updateNode);
  const addNode = useFlowStore((s) => s.addNode);
  const hideNode = useFlowStore((s) => s.hideNode);
  const tableRef = useRef();

  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const _data = dataMap.get(id);
    if (_data) {
      const { columns, data } = _data;
      setColumns(columns);
      setData(data);
    } else {
      fetchTableData(id).then(({ columns, data }) => {
        setColumns(columns);
        setData(data);
        dataMap.set(id, { columns, data });
      });
    }
  }, [id]);

  useEffect(() => {
    if (tableRef.current) {
      console.log(tableRef.current);
    } else {
      const timer = setInterval(() => {
        if (tableRef.current) {
          console.log();
          (tableRef.current.BodyRef.current as HTMLDivElement).addEventListener(
            "scroll",
            () => {
              console.log("table scroll");
              eventBus.emit("TABLE_SCROLL");
            }
          );
          clearInterval(timer);
        }
      }, 500);
    }
  }, []);

  const handleCom = (
    <Handle
      position={Position.Left}
      id={id}
      type="target"
      style={{ zIndex: 99999 }}
    />
  );

  if (!columns.length) {
    return (
      <div style={{ width: 240, height: 240, backgroundColor: "#fff" }}>
        {handleCom}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 220,
          }}
        >
          loading...
        </div>
      </div>
    );
  }

  const onRowClick = (rowId: number | string) => {
    console.log("rowId:::", rowId);
    const newId = nodeId + "_" + rowId;
    if (nodes.findIndex((node) => node.id.endsWith(rowId.toString())) > 0) {
      setHidden((v) => {
        hideNode(newId, !v);
        return !v;
      });

      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const curNode = nodes.find((node) => node.id === nodeId);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const children = curNode.children ? curNode.children : [];

    children.push(newId.toString());
    const targetOrder = tableData.map((row) => nodeId + "_" + row.id);
    children.sort((a, b) => {
      const indexA = targetOrder.indexOf(a);
      const indexB = targetOrder.indexOf(b);
      return indexA - indexB;
    });
    updateNode(nodeId, { children });
    const newNode = {
      type: "custom",
      id: newId.toString(),
      position: { x: curNode!.position.x + 300, y: 10 },
      data: { id: newId, rowId, parentId: nodeId },
      widht: 250,
      height: 250,
      deletable: false,
    };

    addNode(newNode);
    addEdge({
      source: nodeId!.toString(),
      sourceHandle: rowId.toString(),
      target: newId.toString(),
      targetHandle: newId.toString(),
      id: uniqueId(nodeId!.toString()),
      type: "smooth",
      deletable: false,
      animated: true,
    });
  };

  const colRender = (value: any, row: any, column: any) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {value}
        {column.dataKey === "age" && (
          <>
            <Handle
              position={Position.Right}
              id={String(row.id)}
              type="source"
              style={{
                position: "relative",
                top: 2,
                right: -10,
                zIndex: 99999,
              }}
              onClick={() => onRowClick(row.id)}
            />
          </>
        )}
      </div>
    );
  };

  const onDeleteNode = () => {
    const curNode = nodes.find((node) => node.id === nodeId);
    console.log(curNode);
    if (curNode.children) {
      return console.log("r u sure?");
    }
    // TODO:do delete
  };

  return (
    <div style={{ width: 240, height: 240, backgroundColor: "#fff" }}>
      {handleCom}
      {nodeId !== "1" && (
        <Icon
          type="delete-o"
          style={{ position: "absolute", right: 12, top: 12, zIndex: 99 }}
          onClick={onDeleteNode}
        />
      )}
      <Table
        data={tableData}
        scroll={{ y: 80 }}
        style={{ overflowY: "visible" }}
        ref={tableRef}
      >
        {columns.map((col) => (
          <Column
            dataKey={col.dataKey}
            key={col.dataKey}
            label={col.label}
            render={colRender}
          />
        ))}
      </Table>
    </div>
  );
}
