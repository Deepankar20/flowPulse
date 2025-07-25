import { WebSocket, WebSocketServer } from "ws";
import http from "http";
import viewPageEvent from "./events/viewPageEvent";

const PORT = 8080;
const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws: WebSocket) => {
  ws.on("error", console.error);

  ws.on("message", (data) => {
    // handle Buffer or string
    const message = typeof data === "string" ? data : data.toString();
    const msg = JSON.parse(message);

    switch (msg.type) {
      case "capture":
        //captureEvent(msg.id, msg.metadata);
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
    }
  });
});

/**
 server.on("upgrade", (req, socket, head) => {
   const ip = req.headers["location"] || req.socket.remoteAddress;
   console.log(ip);
 });

 */

server.listen(PORT, () => {
  console.log(`WS server running on port ${PORT}`);
});
