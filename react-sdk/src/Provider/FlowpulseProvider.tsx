import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getGeoLocation, getUserMetaData } from "../utils/getUserMetadata";
import { getOrCreateDistinctId } from "../utils/getDistinctId";
import type { FlowPulseContextType, FlowPulseProviderType } from "../types";
import { getParsedBrowserInfo } from "../utils/getBrowser";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
  const [distinctId, setDistinctId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const sessionStartRef = useRef<number>(0);
  const location = useLocation();

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    const newDistictId = getOrCreateDistinctId();
    setDistinctId(newDistictId);
    sessionStartRef.current = Date.now();

    socket.onopen = () => setIsReady(true);
    socket.onclose = () => {
      setIsReady(false);
    };

    wsRef.current = socket;
    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      beforeUnload();
      socket.close();
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, []);

  useEffect(() => {
    if (isReady) {
      viewPage();
    }
  }, [location, isReady, apiKey]);

  const beforeUnload = () => {
    const payload = {
      type: "session",
      data: sessionStartRef.current,
    };

    if (wsRef.current && wsRef.current.readyState === wsRef.current.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  };

  const viewPage = async () => {
    if (wsRef.current && wsRef.current.readyState === wsRef.current?.OPEN) {
      try {
        const meta = getUserMetaData();
        const browser = getParsedBrowserInfo();
        const location = await getGeoLocation();

        const metadata = {
          ...meta,
          browser: browser as string,
          latitude: location?.lat,
          longitude: location?.lng,
        };

        const payload = {
          type: "viewpage",
          metadata,
          apiKey,
          distinctId,
          userId,
        };

        const message = JSON.stringify(payload);

        wsRef.current.send(message);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const capture = async (eventType: string, eventData: object) => {
    if (wsRef.current && wsRef.current.readyState === wsRef.current.OPEN) {
      try {
        const meta = getUserMetaData();
        const browser = getParsedBrowserInfo();
        const location = await getGeoLocation();

        const metadata = {
          ...meta,
          browser: browser as string,
          latitude: location?.lat,
          longitude: location?.lng,
        };
        const payload = {
          type: "capture",
          metadata,
          eventType,
          eventData,
          distinctId,
          userId,
        };

        const message = JSON.stringify(payload);

        wsRef.current.send(message);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const identify = async (
    distinctId: string,
    properties: { email: string; name: string }
  ) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/user/identify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          distinctId,
          apiKey,
          properties,
          email: properties.email,
          name: properties.name,
        }),
      });

      if (!res.ok) return null;

      const data = await res.json();
      localStorage.setItem("userId", data.data.userId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FlowPulseContext.Provider
      value={{ user, setUser, apiKey, viewPage, capture, identify }}
    >
      {children}
    </FlowPulseContext.Provider>
  );
};

export const useFlowPulse = () => {
  const ctx = useContext(FlowPulseContext);
  if (!ctx)
    throw new Error("useFlowPulse must be used inside FlowPulseProvider");
  return ctx;
};
