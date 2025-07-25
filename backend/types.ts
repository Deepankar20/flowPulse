import z from "zod";

export const identifyReqBodySchema = z.object({
  distinctId: z.string(),
  apiKey: z.string(),
  properties: z.object(),
  email: z.email(),
  name: z.string(),
});

export const getAllEventsSchema = z.object({
  projectId: z.number(),
});

export const getEventsGroupByValue = z.object({
  projectId: z.number(),
  value: z.string(),
  fromDate: z.date(),
  toDate: z.date(),
  eventType: z.string(),
});

export type ResultRow = {
  key: string;
  count: number;
  uniqueVisitors: number;
};

export type captureEventType = {
  apiKey: string;
  metadata: object;
  socket: WebSocket;
  eventType: string;
  eventData: object;
  userId: string | null;
  distinctId: string | null;
};

export const viewPageSchema = z.object({
  apiKey: z.string(),
  metadata: z.object(),
  userId: z.number() || z.null(),
  distictId: z.string(),
});

export const captureEventSchema = z.object({
  apiKey: z.string(),
  metadata: z.object(),
  userId: z.number() || z.null(),
  distictId: z.string(),
  eventType: z.string(),
  eventData: z.object(),
});
