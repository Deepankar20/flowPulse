import type WebSocket from "ws";
import viewPageEvent from "./events/viewPageEvent";

export type viewPageEventType = {
  apiKey: string;
  metadata: userMetadataType;
  socket: WebSocket;
};

export type captureEventType = {
  apiKey: string;
  metadata: userMetadataType;
  socket: WebSocket;
  eventType: string;
  eventData: string;
};

type userMetadataType = {
  url: string; // Full page URL
  path: string; // Route path
  referrer: string | null; // Previous page
  userAgent: string; // Browser/device
  language: string; // Browser language
  timezone: Date | null;
  screen: {
    width: number;
    height: number;
  };
};
