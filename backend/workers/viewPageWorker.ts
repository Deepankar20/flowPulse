import { Worker } from "bullmq";
import prisma from "../db/db";
import IOredis from "ioredis";
import { viewPageSchema } from "../types";

const prodConnection = new IOredis(process.env.UPSTASH_REDIS_URL as string, {
  maxRetriesPerRequest: null,
});

const devConnection = new IOredis({
  maxRetriesPerRequest: null,
});

export const viewPageWorker = new Worker(
  "pageViewEventQueue",
  async (job) => {
    try {
      const jobData = job.data;

      const { data, error } = viewPageSchema.safeParse(jobData);

      if (error) {
        console.log("error occured", error);

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
            event: "viewpage",
            properties: data.metadata,
            projectId: project.id,
            userId: data.userId,
            distinctId: data.distinctId,
            path: data.metadata.path,
            url: data.metadata.url,
            referrer: data.metadata.referrer,
            timestamp: new Date(data.metadata.timestamp),
            timezone: data.metadata.timezone,
            language: data.metadata.language,
            useragent: data.metadata.userAgent,
            screenHeight: data.metadata.screen.height,
            screenWidth: data.metadata.screen.width,
            latitude: data.metadata.latitude,
            longitude: data.metadata.longitude,
            browser: data.metadata.browser,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  { connection: prodConnection }
);
