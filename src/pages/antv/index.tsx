import { Edge, Graph, Node } from "@antv/x6";
import React, { useEffect, useRef, useState } from "react";
import { initNodes } from "./node";
import { initEdges } from "./edge";

import "./index.css";
import { createTableNode, createTableRowNode } from "./custom/table-node";

export default function Antv() {
  const rootRef =
    useRef<HTMLDivElement>() as unknown as React.MutableRefObject<HTMLDivElement>;

  const [nodes, setNodes] = useState<Node.Metadata[]>(initNodes);
  const [edges, setEdges] = useState<Edge.Metadata[]>(initEdges);

  useEffect(() => {
    const graph = new Graph({
      container: rootRef.current,
      autoResize: true,
      background: {
        color: "#f5f8fa",
      },
      grid: {
        visible: true,
        type: "dot",
        size: 20,
        args: [
          {
            color: "#e1e3e4",
            thickness: 4,
          },
          {
            color: "#e1e3e4",
            thickness: 4,
          },
        ],
      },
    });

    graph.fromJSON({ nodes, edges });
    const columns = [
      { label: "name", field: "name" },
      { label: "age", field: "age" },
      { label: "gender", field: "gender" },
    ];
    const rows = [{ name: "xiaoming", age: 18, gender: "male" }];
    const tableNode = createTableNode({
      position: { x: 100, y: 100 },
      data: {
        columns,
        rows,
      },
    });
    graph.addNode(tableNode);
    rows.forEach((row) => {
      const rowNode = createTableRowNode(row, columns);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //    @ts-ignore
      rowNode["parent"] = tableNode;
      graph.addNode(rowNode);
    });
  }, [edges, nodes]);
  return (
    <div className="antv-container">
      <div ref={rootRef}></div>
    </div>
  );
}
