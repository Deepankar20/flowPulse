import { Router } from "express";
import type { Request, RequestHandler, Response } from "express";
import prisma from "../db/db";
import { authMiddleware } from "../middleware/authMiddleware";

export const apiKeyRouter = Router();

apiKeyRouter.post("/validate-api-key", async (req: Request, res: Response) => {
  try {
    const apiKey = req.body.apiKey || req.headers["x-api-key"];

    if (!apiKey || apiKey.length == 0) {
      return res.status(400).json({
        msg: "bad request",
        data: null,
      });
    }

    const project = await prisma.project.findUnique({
      where: {
        apiKey,
      },
    });

    if (!project) {
      return res.status(401).json({
        msg: "unauthorised",
        data: null,
      });
    }

    return res.status(200).json({
      msg: "apikey valid",
      data: project.apiKey,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "internal server error",
      data: null,
    });
  }
});

