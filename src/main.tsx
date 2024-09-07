import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import routes from "./routes/index.tsx";
import "./index.css";
import "@xyflow/react/dist/style.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>{routes}</StrictMode>
);
