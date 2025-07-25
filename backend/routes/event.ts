import { Router } from "express";
import type { Request, Response } from "express";
import prisma from "../db/db";
import {
  getAllEventsSchema,
  getEventsGroupByValue,
  type ResultRow,
} from "../types";

export const eventRouter = Router();

eventRouter.get(
  "/getAllEventsByProjectId",
  async (req: Request, res: Response) => {
    try {
      const { data, error } = getAllEventsSchema.safeParse(req.query);

      if (error) {
        res.status(400).json({
          msg: "Bad Request",
          data: null,
        });
        return;
      }

      const allEvents = await prisma.event.findMany({
        where: {
          projectId: data.projectId,
        },
      });

      if (!allEvents) {
        res.status(404).json({
          msg: "Events Not Found",
          data: null,
        });
      }

      res.status(200).json({
        msg: "Successfully Fetched All Events",
        data: allEvents,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
        data: null,
      });
    }
  }
);

eventRouter.get(
  "/getEventsGroupByValue",
  async (req: Request, res: Response) => {
    try {
      const { data, error } = getEventsGroupByValue.safeParse(req.query);

      if (error) {
        res.status(400).json({
          msg: "Bad Request",
          data: null,
        });
        return;
      }

      const { projectId, value, fromDate, toDate, eventType } = data;

      const result = await prisma.$queryRaw<ResultRow[]>`
 SELECT 
        properties->>'${value}' AS key,
        COUNT(*) AS count,
        COUNT(DISTINCT "distinctId") AS uniqueVisitors
      FROM "Event"
      WHERE 
        "timestamp" >= ${fromDate}
        AND "timestamp" < ${toDate}
        AND "projectId" = ${projectId}
        AND "event" = ${eventType}
      GROUP BY key
      HAVING key IS NOT NULL
      ORDER BY count DESC;
    `;

      if (!result) {
        res.status(404).json({
          msg: "Events Not Found",
          data: null,
        });
      }

      res.status(200).json({
        msg: "Successfully Fetched All Events",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
        data: null,
      });
    }
  }
);

eventRouter.get("/getPageViewEvents", async () => {});

eventRouter.get("/getUniqueVisitors", async () => {});

eventRouter.get("/dailyActiveUser", async () => {});

eventRouter.get("/weeklyActiveUser", async () => {});
