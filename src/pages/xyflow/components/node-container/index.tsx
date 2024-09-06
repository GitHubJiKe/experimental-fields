import { useRef, useEffect } from "react";
import { Icon } from "@ss/mtd-react";
import { ReactFlow, Node, Handle, useNodes, useNodeId } from "@xyflow/react";
import NodeItem from "../node-item";
import "./index.css";
import { isArray, isObject } from "lodash-es";

interface INodeContainerProps {
  data: {
    children: Array<Node>;
  };
}

export default function NodeContainer({ data }: INodeContainerProps) {
  const childrenRef = useRef<Node[]>([]);
  const nodes = useNodes();
  const curNodeId = useNodeId();

  console.log(nodes.length, curNodeId);
  useEffect(() => {
    if (isArray(nodes)) {
      const curNode = nodes.find((v) => v.id === curNodeId);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      childrenRef.current = curNode.data.children;
    }
  }, [curNodeId, nodes]);

  return (
    <div className="nc">
      <div className="nc-header">
        <div className="nch-left">
          <span className="nchl-tag">公式</span>
        </div>
        <div className="nch-right">
          <Icon type="file-o" />
        </div>
      </div>
      {childrenRef.current.map((item) => (
        <NodeItem />
      ))}
    </div>
  );
}
