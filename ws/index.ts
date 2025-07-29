import { WebSocket, WebSocketServer } from "ws";
import http from "http";
import url from "url";
import viewPageEvent from "./events/viewPageEvent";
import { formatDuration } from "./utils/formatDuration";
import captureEvent from "./events/captureEvent";
import { apiKeyToSockets } from "./InMemory/ApiKeyToSocketID";

const PORT = 8080;
const server = http.createServer();

function isValidApiKey(apiKey: string): boolean {
  return true;
}

server.on("upgrade", (req, socket, head) => {

  const { query } = url.parse(req.url || "", true);
  const apiKey = query.apiKey as string;

  if (query.role === "admin") {
    if (!apiKey || !isValidApiKey(apiKey)) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }
  }

  const wss = new WebSocketServer({ noServer: true });

  wss.handleUpgrade(req, socket, head, (ws) => {
    if (query.role === "admin" && apiKey) {
      if (!apiKeyToSockets.has(apiKey)) {
        apiKeyToSockets.set(apiKey, new Set());
      }
      apiKeyToSockets.get(apiKey)!.add(ws);

      ws.on("close", () => {
        const sockets = apiKeyToSockets.get(apiKey);
        if (sockets) {
          sockets.delete(ws);
          if (sockets.size === 0) {
            apiKeyToSockets.delete(apiKey);
          }
        }
      });

      ws.on("error", (error) => {
        console.error("Admin WebSocket error:", error);
        const sockets = apiKeyToSockets.get(apiKey);
        if (sockets) {
          sockets.delete(ws);
          if (sockets.size === 0) {
            apiKeyToSockets.delete(apiKey);
          }
        }
      });
    }
    
    handleConnection(ws);
  });
});

function handleConnection(ws: WebSocket) {
  ws.on("error", console.error);

  ws.on("message", (data) => {
    const message = typeof data === "string" ? data : data.toString();
    const msg = JSON.parse(message);

    switch (msg.type) {
      case "capture":
        captureEvent({
          metadata: msg.metadata,
          apiKey: msg.apiKey,
          socket: ws,
          userId: msg.userId,
          distinctId: msg.distinctId,
          eventData: msg.eventData,
          eventType: msg.eventType,
        });
        break;

      case "viewpage":
        viewPageEvent({
          metadata: msg.metadata,
          apiKey: msg.apiKey,
          socket: ws,
          userId: msg.userId,
          distinctId: msg.distinctId,
        });
        break;

      case "session":
        console.log(
          "session Duration : ",
          formatDuration(Date.now() - msg.data)
        );
        break;
    }
  });
}

server.listen(PORT, () => {
  console.log(`WS server running on port ${PORT}`);
});
