import { Router } from "express";
import type { Request, RequestHandler, Response } from "express";
import prisma from "../db/db";
import { authMiddleware } from "../middleware/authMiddleware";
import { createProjectSchema, type AuthRequest } from "../types";

export const projectRouter = Router();

projectRouter.post(
  "/create",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          msg: "unauthorised",
          data: null,
        });
      }

      const { data, error } = createProjectSchema.safeParse(req.body);

      if (error) {
        return res.status(400).json({
          msg: "invalid body",
          data: null,
        });
      }

      const newApiKey = "apikey_" + crypto.randomUUID();

      const newProject = await prisma.project.create({
        data: {
          appOwnerId: user.id,
          apiKey: newApiKey,
          name: data.name,
          description: data.description,
        },
      });

      if (!newProject) {
        return res.status(500).json({
          msg: "unable to create project",
          data: null,
        });
      }

      return res.status(201).json({
        msg: "created project success",
        data: newProject,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "internal server error",
        data: null,
      });
    }
  }
);

projectRouter.get(
  "/allProjectsById",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const appOwnerId = req.user?.id;

      if (!appOwnerId) {
        return res.status(401).json({
          msg: "unauthorised",
          data: null,
        });
      }

      const allProjects = await prisma.project.findMany({
        where: {
          appOwnerId,
        },
      });

      if (!allProjects) {
        return res.status(404).json({
          msg: "projects not found",
          data: null,
        });
      }

      return res.status(200).json({
        msg: "all projects fetched",
        data: allProjects,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "internal server error",
        data: null,
      });
    }
  }
);

projectRouter.get(
  "/getProjectById",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const projectId = req.query.projectId;

      const projectIdInt = parseInt(projectId as string);

      if (!projectIdInt) {
        return res.status(400).json({
          msg: "invalid body",
          data: null,
        });
      }

      const project = await prisma.project.findUnique({
        where: {
          id: projectIdInt,
        },
      });

      if (!project) {
        return res.status(404).json({
          msg: "project not found",
          data: null,
        });
      }

      return res.status(200).json({
        msg: "project fetched",
        data: project,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "internal server error",
        data: null,
      });
    }
  }
);
