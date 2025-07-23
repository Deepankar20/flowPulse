import authenticateApiKey from "../auth";
import type { viewPageEventType } from "../types";

export default async function viewPageEvent({
  metadata,
  apiKey,
  socket,
}: viewPageEventType) {
  try {
    if (!metadata || !apiKey || !socket) {
      return;
    }

    const validApiKey = await authenticateApiKey(apiKey);

    if (!validApiKey) {
      return;
    }
  } catch (error) {
    console.error(error);
  }
}
