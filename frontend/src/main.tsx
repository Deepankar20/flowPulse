import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import SocketProvider from "./context/SocketContext.tsx";

import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      appearance={{ baseTheme: dark }}
      publishableKey={PUBLISHABLE_KEY}
    >
      <SocketProvider>
        <App />
      </SocketProvider>
    </ClerkProvider>
  </StrictMode>
);
