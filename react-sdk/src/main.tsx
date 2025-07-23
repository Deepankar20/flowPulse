import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FlowPulseProvider } from "./Provider/FlowpulseProvider.tsx";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <FlowPulseProvider apiKey={"test-api-key"}>
        <App />
      </FlowPulseProvider>
    </BrowserRouter>
  </StrictMode>
);
