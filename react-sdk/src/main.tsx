import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FlowPulseProvider } from "./Provider/FlowpulseProvider.tsx";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <FlowPulseProvider apiKey={"apikey_e12b3886-baf4-418b-b8f4-2f3b77b18824"}>
        <App />
      </FlowPulseProvider>
    </BrowserRouter>
  </StrictMode>
);
