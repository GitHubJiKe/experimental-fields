export const treeRootId = 1;
export const initialTree = {
  1: {
    id: "1",
    name: "root",
    type: "input",
    children: ["2", "3"],
    dataSource: [
      {
        key: "1_1_row",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
      },
      {
        key: "1_2_row",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号",
      },
    ],
  },
  2: {
    id: "2",
    name: "child2",
    children: ["4", "5"],
    dataSource: [
      {
        key: "2_1_row",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
      },
      {
        key: "2_2_row",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号",
      },
    ],
  },
  3: {
    id: "3",
    name: "child3",
    children: ["6", "7"],
    dataSource: [
      {
        key: "3_1_row",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
      },
      {
        key: "3_2_row",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号",
      },
    ],
  },
  4: {
    id: "4",
    name: "grandChild4",
    dataSource: [
      {
        key: "4_1_row",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
      },
      {
        key: "4_2_row",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号",
      },
    ],
  },
  5: {
    id: "5",
    name: "grandChild5",
    dataSource: [
      {
        key: "5_1_row",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
      },
      {
        key: "5_2_row",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号",
      },
    ],
  },
  6: {
    id: "6",
    name: "spouse of child 3",
    dataSource: [
      {
        key: "6_1_row",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
      },
      {
        key: "6_2_row",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号",
      },
    ],
  },
  7: {
    id: "7",
    name: "root sibling",
    dataSource: [
      {
        key: "7_1_row",
        name: "胡彦斌",
        age: 32,
        address: "西湖区湖底公园1号",
      },
      {
        key: "7_2_row",
        name: "胡彦祖",
        age: 42,
        address: "西湖区湖底公园1号",
      },
    ],
  },
};
