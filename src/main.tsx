import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import routes from "./routes/index.tsx";
import "@ss/mtd-react/lib/style/index.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>{routes}</StrictMode>
);
