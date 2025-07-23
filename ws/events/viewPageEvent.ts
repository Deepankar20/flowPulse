import authenticateApiKey from "../auth/auth";
import type { viewPageEventType } from "../types";
import { pageViewEventQueue } from "../queue/queue";
import { apiKeyToSockets } from "../InMemory/ApiKeyToSocketID";
export default async function viewPageEvent({
  metadata,
  apiKey,
  socket,
  distinctId,
  userId,
}: viewPageEventType) {
  try {
    if (!metadata || !apiKey || !socket) {
      return;
    }

    const validApiKey = await authenticateApiKey(apiKey);

    if (!validApiKey) {
      return;
    }

    pageViewEventQueue.add("pageView", { metadata, apiKey });

    for (const ws of apiKeyToSockets.get(apiKey) as Set<WebSocket>) {
      const payload = {
        metadata,
        type: "viewPage",
      };

      const message = JSON.stringify(payload);
      ws.send(message);
    }
  } catch (error) {
    console.error(error);
  }
}
