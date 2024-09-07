import {
  Handle,
  Position,
  useNodeId,
  useNodes,
  useNodesData,
  useStoreApi,
  Node,
  Edge,
  useEdges,
} from "@xyflow/react";
import { eventBus, justifyContent } from "../utils";
import { cardNodeWidth, createCardNodeGroup } from "../../node";
import { COLOR_MAP, SET_EDGE_EVENT, SET_NODE_EVENT } from "../../constant";
import { createEdge } from "../../edge";
import { genTableRowNode } from ".";

export interface ITableRowComponentProps {
  columns: Column[];
  row: Record<string, unknown>;
  selected: boolean;
  groupId: string | number;
}

export default function TableRowComponent({
  data,
}: {
  data: ITableRowComponentProps;
}) {
  const { columns, row, selected } = data;

  const nodeId = useNodeId();
  const nodes = useNodes();
  const edges = useEdges()
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

    const curRowNodeId = rowNode.id;

    const { nodes: oldNodes, edges: oldEdges } = storeApi.getState();
    const allCardNodes = oldNodes.filter((node) => {
      return node.type === "group";
    });

    const nextLevel = prevLevel + 1
    const siblings = allCardNodes.filter(node => node.data.level === nextLevel).length

    const prevCardNode = oldNodes.find(node => node.id === cardNode?.id)
    const cardNodeGroups = createCardNodeGroup(
      nextLevel,
      COLOR_MAP.DEEP_ORANGE,
      siblings,
      prevCardNode as Node,
      curRowNodeId
    );

    oldNodes.forEach((node) => {
      if (node.id === nodeId) {
        node.data["selected"] = true;
      }
    });
    const cardRowNode = genTableRowNode({
      data: {
        columns,
        groupId: curRowNodeId,
        row: {
          city: "成都",
          cur: -12,
          con: 24,
        },
        selected: false,
      },
      position: {
        x: 2,
        y: 46 + 44,
      },
      extend: "parent",
      style: {
        width: cardNodeWidth - 4,
      },
    }, cardNodeGroups[0].id)
    const cardRowNode2 = genTableRowNode({
      data: {
        columns,
        groupId: curRowNodeId,
        row: {
          city: "成都",
          cur: -100,
          con: 24000,
        },
        selected: false,
      },
      position: {
        x: 2,
        y: 46 + 44 + 34,
      },
      extend: "parent",
      style: {
        width: cardNodeWidth - 4,
      },
    }, cardNodeGroups[0].id)

    const newNodes = [...oldNodes, ...cardNodeGroups, cardRowNode, cardRowNode2] as Node[];

    eventBus.emit(SET_NODE_EVENT, newNodes);

    const newEdge = createEdge(rowNode.id, cardNodeGroups[1].id);

    eventBus.emit(SET_EDGE_EVENT, [...oldEdges, newEdge] as Edge[]);
  };

  const onHideRow = () => {
    nodes.forEach(node => {
      if (node.data && node.data.groupId === rowNode.id) {
        node.hidden = true
      }
    })

    edges.forEach(edge => {
      if (edge.data && edge.data.groupId === rowNode.id) {
        edge.hidden = true
      }
    })


    eventBus.emit(SET_NODE_EVENT, [...nodes])
    eventBus.emit(SET_EDGE_EVENT, [...edges])


  }

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
        visibility: rowNode.hidden ? 'hidden' : 'visible'
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
      <Handle type="source" position={Position.Right} onClick={onHideRow} />
    </div>
  );
}
