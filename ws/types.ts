import type WebSocket from "ws";
import viewPageEvent from "./events/viewPageEvent";

export type viewPageEventType = {
  apiKey: string;
  metadata: userMetadataType;
  socket: WebSocket;
  userId: string | null;
  distinctId: string | null;
};

export type captureEventType = {
  apiKey: string;
  metadata: userMetadataType;
  socket: WebSocket;
  eventType: string;
  eventData: object;
  userId: string | null;
  distinctId: string | null;
};

type userMetadataType = {
  url: string;
  path: string;
  referrer: string | null;
  userAgent: string;
  language: string;
  timezone: Date | null;
  screen: {
    width: number;
    height: number;
  };
  timestamp: number;
};
