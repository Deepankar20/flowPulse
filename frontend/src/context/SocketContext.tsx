import { createContext, useEffect, useState, useRef, useContext } from "react";
import type { SocketContextType, SocketProviderType } from "../types";

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("state is undefined");

  return state;
};

const SocketProvider = ({ children }: SocketProviderType) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [pathFilter, setPathFilter] = useState<[] | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem("apiKey")
  );
  console.log(apiKey);

  useEffect(() => {
    if (!apiKey) return;

    const socket = new WebSocket(
      `ws://localhost:8080?role=admin&apiKey=${apiKey}`
    );

    socket.onopen = () => setIsReady(true);
    socket.onclose = () => setIsReady(false);

    socket.onmessage = (event) => {
      try {
        console.log("viewpage Event : ", event.data);
      } catch (error) {
        console.error(error);
      }
    };

    wsRef.current = socket;
    setSocket(socket);

    return () => {
      socket.close();
    };
  }, [apiKey]);

  return (
    <SocketContext.Provider value={{ socket, pathFilter, apiKey, setApiKey }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
