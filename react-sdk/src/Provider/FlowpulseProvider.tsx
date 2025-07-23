import React, { createContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

type FlowPulseContextType = {
  user: string | null;
  setUser: (user: string | null) => void;
  apiKey: string;
  visit: (location: string, apiKey: string) => void;
  capture: () => void;
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
      visit(location.pathname, apiKey);
    }
  }, [location, isReady, apiKey]);

  function getUserMetaData() {
    return {
      url: window.location.href, // Full page URL
      path: window.location.pathname, // Route path
      referrer: document.referrer || null, // Previous page
      userAgent: navigator.userAgent, // Browser/device
      language: navigator.language, // Browser language
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
      },
      // Geolocation is async and permission-based, see below for details
    };
  }

  const visit = (pathname: string, apiKey: string) => {
    if (wsRef.current && wsRef.current.readyState === wsRef.current?.OPEN) {
      try {
        const payload = {
          type: "visit",
          pathname,
          apiKey,
        };

        const message = JSON.stringify(payload);

        wsRef.current.send(message);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const capture = () => {};

  return (
    <FlowPulseContext.Provider
      value={{ user, setUser, apiKey, visit, capture }}
    >
      {children}
    </FlowPulseContext.Provider>
  );
};
