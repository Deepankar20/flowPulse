import type WebSocket from "ws";

export type visitEventType = {
  apiKey: string;
  pathname: string;
  socket: WebSocket;
};
