import authenticateApiKey from "../auth/auth";
import type { captureEventType } from "../types";
import { captureEventsQueue } from "../queue/queue";
import { apiKeyToSockets } from "../InMemory/ApiKeyToSocketID";

export default async function captureEvent({
  metadata,
  apiKey,
  socket,
  distinctId,
  userId,
  eventData,
  eventType,
}: captureEventType) {
  try {
    if (!apiKey || !metadata) {
      return;
    }

    const sockets = apiKeyToSockets.get(apiKey);
    if (sockets) {
      for (const ws of sockets) {
        const payload = {
          type: "capture-dashboard",
          metadata,
          apiKey,
          distinctId,
          userId,
          eventData,
          eventType,
        };
        const message = JSON.stringify(payload);

        ws.send(message);
      }
    }

    const job = await captureEventsQueue.add(
      "captureEvent",
      {
        type: "capture-dashboard",
        metadata,
        apiKey,
        distinctId,
        userId,
        eventData,
        eventType,
      },
      {
        removeOnComplete: true,
        removeOnFail: {
          count: 10,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}
