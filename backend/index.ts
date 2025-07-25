import express from "express";
import cors from "cors";
import { apiKeyRouter } from "./routes/apiKey";
import { appRouter } from "./routes/app";
import { viewPageWorker } from "./workers/viewPageWorker";
viewPageWorker

const app = express();

app.use(
  cors({
    allowedHeaders: "*",
  })
);

app.use(express.json());

app.use("/api/v1/", apiKeyRouter);
app.use("/api/v1/app", appRouter);

app.listen(3000);
