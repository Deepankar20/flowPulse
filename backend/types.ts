import z, { nullable } from "zod";
import type { Request } from "express";

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
  fromDate: z.preprocess((val) => new Date(val as string), z.date()),
  toDate: z.preprocess((val) => new Date(val as string), z.date()),
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

const userMetadataSchema = z.object({
  url: z.string(),
  path: z.string(),
  referrer: z.string().nullable(),
  userAgent: z.string(),
  language: z.string(),
  timezone: z.string(),
  screen: z.object({
    width: z.number(),
    height: z.number(),
  }),
  timestamp: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  browser: z.string(), // Number (as per your requirements)
});

export const viewPageSchema = z.object({
  apiKey: z.string(),
  metadata: z.object({
    url: z.string(),
    path: z.string(),
    referrer: z.string().nullable(),
    userAgent: z.string(),
    language: z.string(),
    timezone: z.string(),
    screen: z.object({
      width: z.number(),
      height: z.number(),
    }),
    timestamp: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    browser: z.string(),
  }),
  userId: z.number().nullable(), // Allow null for anonymous users
  distinctId: z.string(),
});

export const captureEventSchema = z.object({
  apiKey: z.string(),
  metadata: userMetadataSchema,
  userId: z.number() || z.null(),
  distictId: z.string(),
  eventType: z.string(),
  eventData: z.object(),
});

interface appOwner {
  id: number;
  name: string;
  email: string;
  clerkUserId: string;
}

export interface AuthRequest extends Request {
  user?: appOwner;
}

export const createProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const pageViewCountSchema = z.object({
  projectId: z.number(),

  fromDate: z.preprocess((val) => new Date(val as string), z.date()),
  toDate: z.preprocess((val) => new Date(val as string), z.date()),
});
