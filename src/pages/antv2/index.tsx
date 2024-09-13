import { Graph } from "@antv/x6";
import "./components/NodeComponent";
import { LegacyRef, useEffect, useRef } from "react";

export default function Antv2() {
  const rootRef = useRef();
  const graphRef = useRef<Graph>();
  useEffect(() => {
    graphRef.current = new Graph({
      container: rootRef.current,
      background: {
        color: "#F2F7FA",
      },
    });

    graphRef.current.addNode({
      shape: "custom-basic-react-node",
      x: 60,
      y: 100,
      ports: {
        items: [
          {
            id: "port1",
            attrs: {
              circle: {
                magnet: true,
                r: 8,
                stroke: "#31d0c6",
                fill: "#fff",
                strokeWidth: 2,
              },
            },
          },
        ],
      },
    });

    graphRef.current.centerContent();
  }, []);

  return (
    <div
      style={{ width: window.innerWidth - 48, height: 600 }}
      ref={rootRef as unknown as LegacyRef<HTMLDivElement>}
    ></div>
  );
}
