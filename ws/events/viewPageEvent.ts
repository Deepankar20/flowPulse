import authenticateApiKey from "../auth/auth";
import type { viewPageEventType } from "../types";
import { pageViewEventQueue } from "../queue/queue";
import { apiKeyToSockets } from "../InMemory/ApiKeyToSocketID";
import { Worker } from "bullmq";

export default async function viewPageEvent({
  metadata,
  apiKey,
  distinctId,
  userId,
}: viewPageEventType) {
  try {
    if (!apiKey || !metadata) {
      return;
    }

    const socket = apiKeyToSockets.get(apiKey);
    if (socket) {
      const payload = {
        type: "pageview-dashboard",
        metadata,
        apiKey,
        distinctId,
        userId,
      };
      const message = JSON.stringify(payload);

      socket.send(message);
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
