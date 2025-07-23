import { WebSocket, WebSocketServer } from "ws";
import http from "http";
import viewPageEvent from "./events/viewPageEvent";
import type { Request } from "express";

const server = http.createServer();

const wss = new WebSocketServer({ server });
const PORT = 8080;

wss.on("connection", (ws: WebSocket) => {
  ws.on("error", console.error);

  ws.on("message", (data: string) => {
    const msg = JSON.parse(data);

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
      

      case "auth":
        
    }
  });
});

//Write this func in future :

server.on("upgrade", (req: Request) => {
  const ip = req.headers["location"] || req.socket.remoteAddress;
  console.log(ip);
});

server.listen(PORT, () => {
  console.log(`WS server running on port ${PORT}`);
});
