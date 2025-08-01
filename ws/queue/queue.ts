import { Queue } from "bullmq";

import IOredis from "ioredis";


 const prodConnection = new IOredis(process.env.UPSTASH_REDIS_URL as string, {
   maxRetriesPerRequest: null,
 });

 

const devConnection = new IOredis({
  maxRetriesPerRequest: null,
});

export const pageViewEventQueue = new Queue("pageViewEventQueue", {
  connection: prodConnection,
});

export const captureEventsQueue = new Queue("captureEventQueue", {
  connection: prodConnection,
});

pageViewEventQueue.on("error", (err) =>
  console.error("pageViewEventQueue error", err)
);
captureEventsQueue.on("error", (err) =>
  console.error("captureEventsQueue error", err)
);
