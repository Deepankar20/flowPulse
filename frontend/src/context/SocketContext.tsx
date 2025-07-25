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

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
  

    socket.onopen = () => setIsReady(true);
    socket.onclose = () => setIsReady(false);

    /** 
  const wsRef = useState(
    socket.onmessage = (event) => {
      try {
        const type = event.type;

      } catch (error) {
        console.error(error);
      }
    };

    */

    wsRef.current = socket;
    setSocket(socket);

    return () => {

      socket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, pathFilter }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
