import { Handle, Position } from "@xyflow/react";
import "./index.css";

export default function NodeItem() {
  return (
    <div className="node-item">
      <Handle type="target" position={Position.Left} />
      <div className="item-content">
        <div className="name">入口曝光UV</div>
        <div className="val1">+13.23万</div>
        <div className="val2">-23.32万</div>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
