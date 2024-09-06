export const initNodes = [
  {
    id: "node1",
    shape: "rect",
    x: 40,
    y: 40,
    width: 100,
    height: 40,
    label: "hello",
    attrs: {
      // body 是选择器名称，选中的是 rect 元素
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
  },
  {
    id: "node2",
    shape: "rect",
    x: 160,
    y: 180,
    width: 100,
    height: 40,
    label: "world",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
  },
];
