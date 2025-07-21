import { WebSocket, WebSocketServer } from "ws";
import http from "http";

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

      case "visit":
        //(msg.id, msg.metadata);
    }
  });
});

/*
    Write this func in future : 

    server.on("upgrade", () => {
        auth();
    })

    for authenticating the conn req from the various clients
    so that we know which user is connecting to which org.
 */

server.listen(() => {
  console.log(`WS server running on port ${PORT}`);
}, PORT);
