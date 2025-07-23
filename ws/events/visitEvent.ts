import type { visitEventType } from "../types";

export default function visitEvent({
  pathname,
  apiKey,
  socket,
}: visitEventType) {
  try {
    if (!pathname || !apiKey || !socket) {
      return;
    }


  } catch (error) {}
}
