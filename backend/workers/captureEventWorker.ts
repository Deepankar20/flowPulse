import { Worker } from "bullmq";
import prisma from "../db/db";
import IOredis from "ioredis";
import { captureEventSchema } from "../types";

/**

 const prodConnection = new IOredis(process.env.UPSTASH_REDIS_URL as string, {
   maxRetriesPerRequest: null,
 });

 */

const devConnection = new IOredis({
  maxRetriesPerRequest: null,
});

export const captureEventWorker = new Worker(
  "captureEventQueue",
  async (job) => {
    try {
      const jobData = job.data;

      const { data, error } = captureEventSchema.safeParse(jobData);

      if (error) {
        return;
      }

      const apiKey = data.apiKey;

      const tx = await prisma.$transaction(async (tx) => {
        const project = await prisma.project.findUnique({
          where: {
            apiKey,
          },
        });

        if (!project) {
          return;
        }

        const pushEvent = await prisma.event.create({
          data: {
            event: data.eventType,
            properties: data.eventData,
            projectId: project.id,
            userId: data.userId,
            distinctId: data.distictId,
            timestamp: new Date(data.metadata.timestamp),
            path: data.metadata.path,
            url: data.metadata.url,
            referrer: data.metadata.referrer,
            timezone: data.metadata.timezone,
            language: data.metadata.language,
            useragent: data.metadata.userAgent,
            screenHeight: data.metadata.screen.height,
            screenWidth: data.metadata.screen.width,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  { connection: devConnection }
);
