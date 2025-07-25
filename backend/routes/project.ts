import { Router } from "express";
import type { Request, Response } from "express";
import prisma from "../db/db";

export const projectRouter = Router();

projectRouter.get("/", () => {});
