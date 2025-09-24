import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ScrambleWords } from "./05-useReducer/reducer/ScrambleWords";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ScrambleWords />
  </StrictMode>
);
