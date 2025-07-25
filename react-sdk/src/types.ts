import type { ReactNode } from "react";

export type FlowPulseContextType = {
  user: string | null;
  setUser: (user: string | null) => void;
  apiKey: string;
  viewPage: () => void;
  capture: (eventType: string, eventData: object) => void;
  identify: (distictId: string, properties: object) => void;
};

export type FlowPulseProviderType = {
  apiKey: string;
  children: ReactNode;
};
