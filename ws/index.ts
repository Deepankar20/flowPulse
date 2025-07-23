import { WebSocket, WebSocketServer } from "ws";
import http from "http";
import visitEvent from "./events/visitEvent";
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

      case "visit":
        visitEvent({ pathname: msg.pathname, apiKey: msg.apiKey, socket: ws });
        break;
    }
  });
});

//Write this func in future :

server.on("upgrade", (req: Request) => {
  const ip = req.headers["location"] || req.socket.remoteAddress;
  console.log(ip);
});

//for authenticating the conn req from the various clients
//so that we know which user is connecting to which org.

server.listen(PORT, () => {
  console.log(`WS server running on port ${PORT}`);
});
