import { useCallback, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
  Connection,
  Controls,
  Background,
  BackgroundVariant,
  Panel,
  // Node,
  ReactFlowProvider,
  Node,
} from "@xyflow/react";
import { initialNodes } from "./node";
import {
  // createEdge,
  initialEdges,
} from "./edge";
import { Icon } from "@ss/mtd-react";

import "@xyflow/react/dist/style.css";
import "./index.css";
import { eventBus, nodeTypes } from "./custom/utils";
import { SET_EDGE_EVENT, SET_NODE_EVENT } from "./constant";
// import { createNodeItem } from "./components/node-item/util";

const defaultEdgeOptions = { animated: false };
const iconStyle = { fontSize: 24, cursor: "pointer" };

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes as Node[]
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    eventBus.on(SET_NODE_EVENT, setNodes);
    eventBus.on(SET_EDGE_EVENT, setEdges);
  }, [setEdges, setNodes]);

  return (
    <div className="flow">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          defaultEdgeOptions={defaultEdgeOptions}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background
            color="#d7d8d9"
            bgColor="#f5f8fa"
            variant={BackgroundVariant.Cross}
          />
          <Controls position={"top-left"} orientation={"vertical"} />
          <Panel
            position="top-right"
            style={{ position: "absolute", right: 0, width: "fit-content" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: 20,
                backgroundColor: "white",
                padding: 8,
                borderRadius: 8,
                boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.08)",
              }}
            >
              <Icon type="save-o" style={iconStyle} />
              <Icon type="micrify" style={iconStyle} />
              <Icon type="enlarge" style={iconStyle} />
              <Icon type="fullscreen-o" style={iconStyle} />
            </div>
          </Panel>
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
