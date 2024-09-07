import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home";
import Charts from "../pages/charts";
import Flow from "../pages/xyflow";
import WithBack from "../components/with-back";
import Antv from "../pages/antv";
import { BuildOutlined, HighlightOutlined, HomeOutlined, LineChartOutlined } from "@ant-design/icons";
import XYFlow from "../pages/xyflow2";

export const routeList = [
  {
    path: "/",
    element: <Home />,
    name: "Home",
    icon: <HomeOutlined />,
  },
  {
    path: "/charts",
    element: (
      <WithBack>
        <Charts />
      </WithBack>
    ),
    name: "Charts",
    icon: <LineChartOutlined />,
  },
  {
    path: "/flow",
    element: (
      <WithBack>
        <Flow />
      </WithBack>
    ),
    name: "Flow",
    icon: <BuildOutlined />,
  },
  {
    path: "/flow2",
    element: (
      <WithBack>
        <XYFlow />
      </WithBack>
    ),
    name: "Flow2",
    icon: <BuildOutlined />,
  },
  {
    path: "/antv",
    element: (
      <WithBack>
        <Antv />
      </WithBack>
    ),
    name: "Antv",
    icon: <HighlightOutlined />,
  },
];

const router = createBrowserRouter(routeList);

const routes = <RouterProvider router={router} />;

export default routes;
