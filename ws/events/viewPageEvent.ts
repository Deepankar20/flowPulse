import authenticateApiKey from "../auth/auth";
import type { viewPageEventType } from "../types";
import { pageViewEventQueue } from "../queue/queue";
import { apiKeyToSockets } from "../InMemory/ApiKeyToSocketID";
import { Worker } from "bullmq";

export default async function viewPageEvent({
  metadata,
  apiKey,
  socket,
  distinctId,
  userId,
}: viewPageEventType) {
  try {
    if (!apiKey || !metadata) {
      return;
    }

    const sockets = apiKeyToSockets.get(apiKey);
    if (sockets) {
      for (const ws of sockets) {
        const payload = {
          type: "pageview-dashboard",
          metadata,
          apiKey,
          distinctId,
          userId,
        };
        const message = JSON.stringify(payload);

        ws.send(message);
      }
    }

    const job = await pageViewEventQueue.add(
      "pageView",
      {
        metadata,
        apiKey,
        distinctId,
        userId,
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
