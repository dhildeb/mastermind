import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Mastermind } from "./Mastermind";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <Mastermind />
  </StrictMode>
);