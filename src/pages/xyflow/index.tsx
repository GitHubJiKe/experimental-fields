import { useState, useEffect, useCallback } from "react";
import { stratify, tree } from 'd3-hierarchy';
import {
  ReactFlow,
  useEdgesState,
  useNodesState,
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  Node,
  ControlButton,
  Edge,
  useReactFlow,
} from "@xyflow/react";
import { initialNodes } from "./node";
import { eventBus, nodeTypes } from "./custom/utils";
import { SET_EDGE_EVENT, SET_NODE_EVENT, TOOGLE_MODAL } from "./constant";
import { SaveOutlined } from "@ant-design/icons";
import { Button, Dropdown, Modal } from "antd";

import "./index.css";

const defaultEdgeOptions = { animated: false };
const iconStyle = { fontSize: 30, cursor: "pointer" };
const g = tree();

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  if (nodes.length === 0) return { nodes, edges };

  const { width, height } = document
    .querySelector(`[data-id="${nodes[0].id}"]`)!
    .getBoundingClientRect();
  const hierarchy = stratify()
    .id((node: Node) => node.id)
    .parentId((node: Node) => '1');
  const root = hierarchy(nodes);
  console.log(root);
  const layout = g.nodeSize([width * 2, height * 2])(root);

  return {
    nodes: layout
      .descendants()
      .map((node: Node) => ({ ...node.data, position: { x: node.x, y: node.y } })),
    edges,
  };
};

function LayoutFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes as Node[]
  );

  const [modalOpen, setModalOpen] = useState(false);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { fitView } = useReactFlow()

  const onLayout = useCallback(
    (direction?: string) => {

      console.log(direction);
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, {
        });

      setNodes([...layoutedNodes]);
      // @ts-ignore
      setEdges([...layoutedEdges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges],
  );

  useEffect(() => {
    eventBus.on(SET_NODE_EVENT, setNodes);
    eventBus.on(SET_EDGE_EVENT, setEdges);
    eventBus.on(TOOGLE_MODAL, setModalOpen);
  }, [setEdges, setNodes]);

  useEffect(() => {
    console.log(nodes);
  }, []);

  const menus = [
    {
      key: 'save',
      label: '保存当前视图为新视图'
    },
    {
      key: 'cover',
      label: '覆盖当前视图'
    }
  ]


  return (
    <div className="flow">
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
        <Controls position={"top-right"} orientation="horizontal" >
          <ControlButton>
            <Dropdown menu={{ items: menus }} trigger={['click']}>
              <SaveOutlined style={iconStyle} />
            </Dropdown>
          </ControlButton>
        </Controls>
      </ReactFlow>
      <Modal open={modalOpen} closable onCancel={() => setModalOpen(false)}>
        <h1>Modal</h1>
      </Modal>
    </div>
  );
}


export default function Flow() {
  return <ReactFlowProvider>
    <LayoutFlow />
  </ReactFlowProvider>
}