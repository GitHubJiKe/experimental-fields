import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Home from "../pages/home";
import Charts from "../pages/charts";
import Flow from "../pages/xyflow";
import WithBack from "../components/with-back";
import Antv from "../pages/antv";
import {
  BuildOutlined,
  HighlightOutlined,
  HomeOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import XYFlow from "../pages/xyflow2";
import XYFlow3 from "../pages/xyflow3";
import Antv2 from "../pages/antv2";
import Frame from "../pages/frame";
import { ReactNode } from "react";
import EasyTable from "../pages/easytable";

type MixedRouteObj = RouteObject & { name: string; icon: ReactNode };

export const routeList: MixedRouteObj[] = [
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
    path: "/flow3",
    element: (
      <WithBack>
        <XYFlow3 />
      </WithBack>
    ),
    name: "Flow3",
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
  {
    path: "/antv2",
    element: (
      <WithBack>
        <Antv2 />
      </WithBack>
    ),
    name: "Antv2",
    icon: <HighlightOutlined />,
  },
  {
    path: "/frame",
    element: (
      <WithBack>
        <Frame />
      </WithBack>
    ),
    name: "Frame",
    icon: <HighlightOutlined />,
    errorElement: <div>Sorry</div>,
  },
  {
    path: "/table",
    element: (
      <WithBack>
        <EasyTable />
      </WithBack>
    ),
    name: "Table",
    icon: <HighlightOutlined />,
    errorElement: <div>Sorry</div>,
  },
];

const router = createBrowserRouter(routeList);

const routes = <RouterProvider router={router} />;

export default routes;
