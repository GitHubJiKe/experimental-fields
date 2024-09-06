import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home";
import Charts from "../pages/charts";
import Flow from "../pages/xyflow";
import WithBack from "../components/with-back";
import Antv from "../pages/antv";

export const routeList = [
  {
    path: "/",
    element: <Home />,
    name: "Home",
    icon: "home-o",
  },
  {
    path: "/charts",
    element: (
      <WithBack>
        <Charts />
      </WithBack>
    ),
    name: "Charts",
    icon: "areachart-o",
  },
  {
    path: "/flow",
    element: (
      <WithBack>
        <Flow />
      </WithBack>
    ),
    name: "Flow",
    icon: "hierarchy-fill",
  },
  {
    path: "/antv",
    element: (
      <WithBack>
        <Antv />
      </WithBack>
    ),
    name: "Antv",
    icon: "hierarchy-fill",
  },
];

const router = createBrowserRouter(routeList);

const routes = <RouterProvider router={router} />;

export default routes;
