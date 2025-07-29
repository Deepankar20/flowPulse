import WebSocket from "ws";

export const apiKeyToSockets = new Map<string, Set<WebSocket>>();
