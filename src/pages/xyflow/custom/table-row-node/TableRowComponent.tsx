import {
  Handle,
  Position,
  useNodeId,
  useNodes,
  useNodesData,
  useStoreApi,
  Node,
  Edge,
} from "@xyflow/react";
import { eventBus, justifyContent } from "../utils";
import { createCardNodeGroup } from "../../node";
import { COLOR_MAP, SET_EDGE_EVENT, SET_NODE_EVENT } from "../../constant";
import { createEdge } from "../../edge";

export interface ITableRowComponentProps {
  columns: Column[];
  row: Record<string, unknown>;
  selected: boolean;
}

export default function TableRowComponent({
  data,
}: {
  data: ITableRowComponentProps;
}) {
  const { columns, row, selected } = data;

  const nodeId = useNodeId();
  const nodes = useNodes();
  const storeApi = useStoreApi();

  const rowNode = nodes.find((node) => node.id === nodeId)!;
  const cardNode = useNodesData(rowNode.parentId!);
  const color = cardNode?.data.color as string;

  const onRowClick = () => {
    if (selected) {
      return;
    }

    const prevLevel = cardNode?.data.level as number;
    if (prevLevel >= 4) {
      return;
    }
    const { nodes: oldNodes, edges: oldEdges } = storeApi.getState();
    const allCardNodes = oldNodes.filter((node) => {
      return node.type === "group";
    });

    const allCardNodeIds = allCardNodes.map((node) => node.id);

    const siblings = oldEdges.filter((edge) => {
      const tempCardNodeId = edge.target.replace(/cardhandle_/, "");
      return allCardNodeIds.includes(tempCardNodeId);
    }).length;

    const cardNodeGroups = createCardNodeGroup(
      prevLevel + 1,
      COLOR_MAP.DEEP_ORANGE,
      siblings
    );

    oldNodes.forEach((node) => {
      if (node.id === nodeId) {
        node.data["selected"] = true;
      }
    });

    const newNodes = [...oldNodes, ...cardNodeGroups] as Node[];
    // .sort(
    //   (a, b) => {
    //     if (a.parentId === b.parentId) {
    //       return 0;
    //     }
    //     return a.parentId && !b.parentId ? 1 : -1;
    //   }
    // );
    console.log(newNodes);
    eventBus.emit(SET_NODE_EVENT, newNodes);

    const newEdge = createEdge(rowNode.id, cardNodeGroups[1].id);
    eventBus.emit(SET_EDGE_EVENT, [...oldEdges, newEdge] as Edge[]);
  };
  const rgbaColor = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
    color.slice(3, 5),
    16
  )}, ${parseInt(color.slice(5, 7), 16)}, 0.5)`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: selected ? rgbaColor : "#fff",
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 4,
        paddingBottom: 4,
        borderBottom: `1px solid #E5E5E5`,
      }}
      onClick={onRowClick}
    >
      {columns.map((col) => {
        return (
          <div
            key={col.field}
            style={{
              flex: col.widthProportion || 1,
              color: "#222222",
              display: "flex",
              alignItems: "center",
              justifyContent: justifyContent(col.align),
            }}
          >
            {col.render ? col.render(row, col) : (row[col.field] as string)}
          </div>
        );
      })}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
