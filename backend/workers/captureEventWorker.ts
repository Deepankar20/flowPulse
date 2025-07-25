import { Worker } from "bullmq";
import prisma from "../db/db";
import IOredis from "ioredis";

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
      console.log(job.data);
    } catch (error) {
      console.log(error);
    }
  },
  { connection: devConnection }
);
