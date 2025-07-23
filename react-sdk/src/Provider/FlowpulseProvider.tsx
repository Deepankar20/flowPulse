import React, { createContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { getUserMetaData } from "../utils/getUserMetadata";

type FlowPulseContextType = {
  user: string | null;
  setUser: (user: string | null) => void;
  apiKey: string;
  viewPage: () => void;
  capture: (eventType: string, eventData: object) => void;
};

type FlowPulseProviderType = {
  apiKey: string;
  children: ReactNode;
};

const FlowPulseContext = createContext<FlowPulseContextType | undefined>(
  undefined
);

export const FlowPulseProvider = ({
  children,
  apiKey,
}: FlowPulseProviderType) => {
  const [user, setUser] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);
  const location = useLocation();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => setIsReady(true);
    socket.onclose = () => setIsReady(false);

    /** 
    socket.onmessage = (event) => {
      try {
        const type = event.type;

      } catch (error) {
        console.error(error);
      }
    };

    */

    wsRef.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (isReady) {
      viewPage();
    }
  }, [location, isReady, apiKey]);

  const viewPage = () => {
    if (wsRef.current && wsRef.current.readyState === wsRef.current?.OPEN) {
      try {
        const metadata = getUserMetaData();

        const payload = {
          type: "viewpage",
          metadata,
          apiKey,
        };

        const message = JSON.stringify(payload);

        wsRef.current.send(message);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const capture = (eventType: string, eventData: object) => {
    if (wsRef.current && wsRef.current.readyState === wsRef.current.OPEN) {
      try {
        const metadata = getUserMetaData();

        const payload = {
          type: "capture",
          metadata,
          eventType,
          eventData,
        };

        const message = JSON.stringify(payload);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <FlowPulseContext.Provider
      value={{ user, setUser, apiKey, viewPage, capture }}
    >
      {children}
    </FlowPulseContext.Provider>
  );
};
