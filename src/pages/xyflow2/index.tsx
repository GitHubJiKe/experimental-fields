import { useCallback, useEffect } from 'react';
import {
    ReactFlow,
    addEdge,
    ConnectionLineType,
    Panel,
    useNodesState,
    useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';
import { initialTree, treeRootId } from './nodes-edges';
import { layoutElements } from './layout-elements';
const nodeTypes = {
    custom: CustomNode,
};

const { nodes: layoutedNodes, edges: layoutedEdges } = layoutElements(
    initialTree,
    treeRootId,
    'LR',
);

export default function XYFlow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

    const onConnect = useCallback(
        (params: any) => {
            console.log(params);
            const edge = (eds: any[]) => addEdge(
                { ...params, type: ConnectionLineType.SmoothStep, animated: true },
                eds,
            )
            return setEdges((eds: any[]) => {
                console.log(eds);
                return edge(eds)
            }
            )
        },
        [],
    );

    const onLayout = useCallback(
        (direction: string | undefined) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } = layoutElements(
                initialTree,
                treeRootId,
                direction,
            );

            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
        },
        [nodes, edges],
    );


    useEffect(() => {
        console.log(edges);
    }, []);

    return (
        <div className="flow">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
                nodeTypes={nodeTypes}
            >
                <Panel position="top-right">
                    <button onClick={() => onLayout('TB')}>vertical layout</button>
                    <button onClick={() => onLayout('LR')}>horizontal layout</button>
                </Panel>
            </ReactFlow>
        </div>
    )
}





