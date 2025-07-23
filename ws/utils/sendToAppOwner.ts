import { apiKeyToSockets } from "../InMemory/ApiKeyToSocketID";
import authenticateApiKey from "../auth/auth";

export function sendToAppOwners(apiKey: string, data: any) {
  const sockets = apiKeyToSockets.get(apiKey);
  if (!sockets) return; // Nobody listening

  for (const ws of sockets) {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(data));
    }
  }
}

export async function onAdminDashboardConnection(
  ws: WebSocket,
  apiKey: string
) {
  const validApiKey = await authenticateApiKey(apiKey);

  if (!validApiKey) {
    ws.close();
    return;
  }

  if (!apiKeyToSockets.has(apiKey)) {
    apiKeyToSockets.set(apiKey, new Set());
  }
  apiKeyToSockets.get(apiKey)?.add(ws);

  ws.onclose = () => {
    apiKeyToSockets.get(apiKey)?.delete(ws);
    if (apiKeyToSockets.get(apiKey)?.size === 0) {
      apiKeyToSockets.delete(apiKey);
    }
  };
}
