import {
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  addEdge,
  reconnectEdge,
  useUpdateNodeInternals,
} from "@xyflow/react";
import { eventBus, initEdges, initNodes } from "./utils";
import CustomNodeComponent from "./CustomNodeComponent";
import "@ss/mtd-react/lib/style/index.css";
import { useCallback, useEffect } from "react";
import { create } from "zustand";
import { layoutElements } from "./layout";
import { isUndefined, pick } from "lodash-es";

export const useFlowStore = create((set) => {
  return {
    nodes: initNodes,
    edges: initEdges,
    addNode: (node) => set((s) => ({ nodes: [...s.nodes, node] })),
    addEdge: (edge) => set((s) => ({ edges: [...s.edges, edge] })),
    updateNode: (id, params) => {
      set((s) => {
        const newNodes = s.nodes.map((node) => {
          if (node.id === id) {
            return { ...node, ...params };
          }

          return { ...node };
        });

        return { nodes: newNodes };
      });
    },
    hideNode: (nodeId, visible) => {
      set((s) => {
        console.log(visible);
        const hide = (children) => {
          s.nodes.forEach((node) => {
            if (children.includes(node.id)) {
              node.hidden = isUndefined(node.hidden) ? true : visible;
              s.toggleEdge(node.id, node.hidden);
              if (node.children) {
                hide(node.children);
              }
            }
          });
        };

        for (let index = 0; index < s.nodes.length; index++) {
          const node = s.nodes[index];
          if (node.id === nodeId) {
            node.hidden = isUndefined(node.hidden) ? true : visible;
            s.toggleEdge(nodeId, node.hidden);
            if (node.children) {
              hide(node.children);
              break;
            }
          }
        }

        return { nodes: [...s.nodes] };
      });
    },
    toggleEdge: (nodeId: string, visible: boolean) => {
      set((s) => {
        const edges = s.edges.map((edge) => {
          if (edge.target === nodeId) {
            return { ...edge, hidden: visible };
          }

          return { ...edge };
        });

        return { edges };
      });
    },
  };
});

const nodeTypes = {
  custom: CustomNodeComponent,
};

function MyFlow() {
  const _nodes = useFlowStore((s) => s.nodes);
  const _edges = useFlowStore((s) => s.edges);
  const [nodes, setNodes, onNodesChange] = useNodesState(_nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(_edges);
  const updateNodeInternals = useUpdateNodeInternals();
  const onConnect = useCallback(
    (params: any) => {
      const edge = (eds: any[]) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        );
      return setEdges((eds: any[]) => {
        return edge(eds);
      });
    },
    [setEdges]
  );
  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) =>
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    []
  );
  useEffect(() => {
    const tree = {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    _nodes.forEach((node) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      tree[node.id] = node;
    });

    const { nodes: layoutedNodes, edges: layoutedEdges } = layoutElements(
      tree,
      "1",
      _nodes,
      _edges
    );
    console.log(layoutedNodes, layoutedEdges);

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);

    const onScroll = () => {
      console.log("scrolled");
      layoutedNodes.forEach((node) => updateNodeInternals(node.id));
    };
    setTimeout(onScroll, 100);

    eventBus.on("TABLE_SCROLL", onScroll);
  }, [_nodes, _edges, setNodes, setEdges, onReconnect, updateNodeInternals]);

  const onNodeMouseMove = useCallback((e, n) => {}, []);

  return (
    <div style={{ width: "100%", height: "88vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeMouseMove={onNodeMouseMove}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        preventScrolling={false}
      >
        <Background
          color="#d7d8d9"
          bgColor="#f5f8fa"
          variant={BackgroundVariant.Cross}
        />
      </ReactFlow>
    </div>
  );
}

export default function XY3Flow() {
  return (
    <ReactFlowProvider>
      <MyFlow />
    </ReactFlowProvider>
  );
}
