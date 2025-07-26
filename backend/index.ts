import express from "express";
import cors from "cors";
import { apiKeyRouter } from "./routes/apiKey";
import { appRouter } from "./routes/app";
import { viewPageWorker } from "./workers/viewPageWorker";
import { captureEventWorker } from "./workers/captureEventWorker";
import { eventRouter } from "./routes/event";
import { projectRouter } from "./routes/project";
viewPageWorker;
captureEventWorker;

const app = express();

app.use(
  cors({
    allowedHeaders: "*",
  })
);

app.use(express.json());

app.use("/api/v1/", apiKeyRouter);
app.use("/api/v1/app", appRouter);
app.use("/api/v1/event/", eventRouter);
app.use("/api/v1/project/", projectRouter);

app.listen(3000);
