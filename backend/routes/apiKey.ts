import { Router } from "express";
import type { Request, Response } from "express";

export const apiKeyRouter = Router();

apiKeyRouter.post("/validate-api-key", async (req: Request, res: Response) => {
  try {
    const apiKey = req.body.apiKey || req.headers["x-api-key"];
  } catch (error) {}
});
