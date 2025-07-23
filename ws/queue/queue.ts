import { Queue } from "bullmq";

export const pageViewEventQueue = new Queue("pageViewEventQueue", {
  connection: { host: "myredis.taskforce.run", port: 32856 },
});

export const captureEventsQueue = new Queue("captureEventQueue", {
  connection: {
    host: "myredis.taskforce.run",
    port: 32856,
  },
});
