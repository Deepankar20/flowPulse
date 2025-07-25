import { Worker } from "bullmq";
import prisma from "../db/db";
import IOredis from "ioredis";
import { viewPageSchema } from "../types";

/**

 const prodConnection = new IOredis(process.env.UPSTASH_REDIS_URL as string, {
   maxRetriesPerRequest: null,
 });

 */

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
        return;
      }

      const apiKey = data.apiKey;

      const tx = await prisma.$transaction(async (tx) => {
        const project = await prisma.project.findFirst({
          where: {
            apiKey,
          },
        });

        if (!project) {
          return;
        }

        const pushEvent = await prisma.event.create({
          data: {
            event: "pageview",
            properties: data.metadata,
            projectId: project.id,
            userId: data.userId,
            distinctId: data.distictId,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  { connection: devConnection }
);
