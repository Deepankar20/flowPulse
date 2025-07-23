import { Worker } from "bullmq";

const viewPageWorker = new Worker(
  "pageViewEventQueue",
  async (job) => {
    // Insert event into DB
    await prisma.event.create({ data: job.data });
  },
  { connection: { host: "myredis.taskforce.run", port: 32856 } }
);
