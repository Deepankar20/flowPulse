import { Router } from "express";
import type { Request, RequestHandler, Response } from "express";
import prisma from "../db/db";
import {
  getAllEventsSchema,
  getEventsGroupByValue,
  pageViewCountSchema,
  uniqueEventSchema,
  type AuthRequest,
} from "../types";
import { authMiddleware } from "../middleware/authMiddleware";
import { Prisma } from "@prisma/client";

export const eventRouter = Router();

eventRouter.post(
  "/getAllEventsByProjectId",
  authMiddleware,

  async (req: AuthRequest, res: Response) => {
    try {
      const { data, error } = getAllEventsSchema.safeParse(req.body);

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

eventRouter.post(
  "/getPathsInfo",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { data, error } = getEventsGroupByValue.safeParse(req.body);

      if (error) {
        res.status(400).json({
          msg: "Bad Request",
          data: null,
        });
        return;
      }

      const { projectId, value, fromDate, toDate, eventType } = data;

      const result = await prisma.$queryRaw<
        {
          path: string | null;
          views: bigint;
          visitors: bigint;
        }[]
      >`
SELECT 
  "path",
  COUNT(*) AS views,
  COUNT(DISTINCT "distinctId") AS visitors
FROM "Event"
WHERE 
  "timestamp" >= ${fromDate}
  AND "timestamp" <= ${toDate}
  AND "event" = 'viewpage'
  AND "projectId" = ${projectId}
  AND "path" IS NOT NULL
GROUP BY "path"
ORDER BY views DESC;
`;

      const cleaned = result.map((row: any) => ({
        path: row.path,
        views: Number(row.views),
        visitors: Number(row.visitors),
      }));

      res.status(200).json({
        msg: "Successfully Fetched Events by Value",
        data: cleaned,
      });
    } catch (error) {
      console.error("Error fetching events:", error);

      res.status(500).json({
        msg: "Internal Server Error",
        data: null,
      });
    }
  }
);

eventRouter.post(
  "/getPageViewEvents",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { data, error } = getEventsGroupByValue.safeParse(req.body);

      if (error) {
        res.status(400).json({
          msg: "Bad Request",
          data: null,
        });
        return;
      }

      const { projectId, value, fromDate, toDate, eventType } = data;
      // const result = await prisma.event

      const result = await prisma.$queryRaw<
        { path: string | null; visitors: bigint }[]
      >(Prisma.sql`
      SELECT 
      ${Prisma.sql([value])},
        COUNT(DISTINCT "distinctId") AS visitors
      FROM "Event"
      WHERE 
        "timestamp" >= ${fromDate}
        AND "timestamp" <= ${toDate}
        AND "event" = 'viewpage'
        AND "projectId" = ${projectId}
        AND "${Prisma.raw(value)}" IS NOT NULL
      GROUP BY ${Prisma.sql([value])}
      ORDER BY visitors DESC;
    `);

      if (!result) {
        return res.status(404).json({
          msg: "Events Not Found",
          data: null,
        });
      }

      const cleaned = result.map((row: any) => ({
        path: row[value],
        visitors: Number(row.visitors),
      }));

      res.status(200).json({
        msg: "Successfully Fetched Viewpage Events",
        data: cleaned,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        msg: "Internal Server Error",
        data: null,
      });
    }
  }
);

eventRouter.post(
  "/getUniqueVisitors",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { data, error } = getEventsGroupByValue.safeParse(req.body);

      if (error) {
        res.status(400).json({
          msg: "Bad Request",
          data: null,
        });
        return;
      }

      const { projectId, value, fromDate, toDate, eventType } = data;

      const result = await prisma.$queryRaw<
        { day: string; uniqueVisitors: number }[]
      >`
          SELECT
            DATE("timestamp") AS day,
            COUNT(DISTINCT "distinctId") AS "uniqueVisitors"
          FROM "Event"
          WHERE
            "event" = 'viewpage'
            AND "projectId" = ${projectId}
            AND "timestamp" BETWEEN ${fromDate} AND ${toDate}
          GROUP BY day
          ORDER BY day ASC;
          `;

      if (!result) {
        res.status(404).json({
          msg: "Events Not Found",
          data: null,
        });
      }

      res.status(200).json({
        msg: "Successfully Fetched Viewpage Events",
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

eventRouter.post(
  "/getPageViewCount",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { data, error } = pageViewCountSchema.safeParse(req.body);

      if (error) {
        return res.status(400).json({
          msg: "Bad Request",
          data: null,
        });
      }

      const { projectId, fromDate, toDate } = data;

      const viewcount = await prisma.event.count({
        where: {
          projectId,
          event: "viewpage",
          timestamp: {
            gte: fromDate,
            lte: toDate,
          },
          path: {
            not: null,
          },
        },
      });

      const result = await prisma.$queryRawUnsafe<{ count: bigint }[]>(
        `
        SELECT COUNT(DISTINCT "distinctId") as count
        FROM "Event"
        WHERE "projectId" = $1
          AND "event" = 'viewpage'
          AND "timestamp" >= $2
          AND "timestamp" <= $3
          AND "path" IS NOT NULL
        `,
        projectId,
        fromDate,
        toDate
      );

      const visitorCount = Number(result[0]?.count || 0);

      if (!viewcount || !visitorCount) {
        return res.status(404).json({
          msg: "Events Not Found",
          data: null,
        });
      }

      return res.status(200).json({
        msg: "pageview count fetched",
        data: { viewcount, visitorCount },
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
        data: null,
      });
    }
  }
);

eventRouter.post(
  "/getViewsByDay",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { data, error } = pageViewCountSchema.safeParse(req.body);

      if (error) {
        return res.status(400).json({
          msg: "Bad Request",
          data: null,
        });
      }

      const { fromDate, toDate, projectId } = data;
      const result = await prisma.$queryRaw<
        { date: string; pageviews: number }[]
      >`
      WITH date_series AS (
        SELECT generate_series(
          DATE(${fromDate}),
          DATE(${toDate}),
          INTERVAL '1 day'
        )::date AS date
      )
      SELECT 
        ds.date,
        COUNT(e.*) AS pageviews
      FROM date_series ds
      LEFT JOIN "Event" e
        ON DATE(e."timestamp") = ds.date
        AND e."event" = 'viewpage'
        AND e."projectId" = ${projectId}
      GROUP BY ds.date
      ORDER BY ds.date ASC;
    `;

      if (!result) {
        return res.status(404).json({
          msg: "Events Not Found",
          data: null,
        });
      }

      const cleaned = result.map((res) => {
        return {
          date: res.date,
          views: Number(res.pageviews),
        };
      });

      return res.status(200).json({
        msg: "fetched pageview per day",
        data: cleaned,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
        data: null,
      });
    }
  }
);

eventRouter.post(
  "/dailyActiveUser",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { data, error } = pageViewCountSchema.safeParse(req.body);

      if (error) {
        return res.status(400).json({
          msg: "Bad Request",
          data: null,
        });
      }

      const { fromDate, toDate, projectId } = data;
      const result = await prisma.$queryRaw<
        { date: string; visitors: number }[]
      >`
      WITH date_series AS (
        SELECT generate_series(
          DATE(${fromDate}),
          DATE(${toDate}),
          INTERVAL '1 day'
        )::date AS date
      )
      SELECT 
        ds.date,
        COUNT(DISTINCT e."distinctId") AS visitors
      FROM date_series ds
      LEFT JOIN "Event" e
        ON DATE(e."timestamp") = ds.date
        AND e."event" = 'viewpage'
        AND e."projectId" = ${projectId}
      GROUP BY ds.date
      ORDER BY ds.date ASC;
    `;

      if (!result) {
        return res.status(404).json({
          msg: "Events Not Found",
          data: null,
        });
      }

      const cleaned = result.map((res) => {
        return {
          date: res.date,
          visitors: Number(res.visitors),
        };
      });

      return res.status(200).json({
        msg: "fetched visitors per day",
        data: cleaned,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
        data: null,
      });
    }
  }
);

eventRouter.get("/weeklyActiveUser", async () => {});

eventRouter.get(
  "/getUniqueEvents",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { data, error } = uniqueEventSchema.safeParse(req.body);

      if (error) {
        return res.status(400).json({
          msg: "Bad Request",
          data: null,
        });
      }

      const { fromDate, toDate, projectId, event } = data;

      const result = await prisma.$queryRaw<
        { date: string; visitors: number }[]
      >`
    WITH date_series AS (
      SELECT generate_series(
        DATE(${fromDate}),
        DATE(${toDate}),
        INTERVAL '1 day'
      )::date AS date
    )
    SELECT 
      ds.date,
      COUNT(DISTINCT e."distinctId") AS visitors
    FROM date_series ds
    LEFT JOIN "Event" e
      ON DATE(e."timestamp") = ds.date
      AND e."event" = ${event}
      AND e."projectId" = ${projectId}
    GROUP BY ds.date
    ORDER BY ds.date ASC;
  `;

      if (!result) {
        return res.status(404).json({
          msg: "Events Not Found",
          data: null,
        });
      }

      const cleaned = result.map((res) => {
        return {
          date: res.date,
          visitors: Number(res.visitors),
        };
      });

      return res.status(200).json({
        msg: "fetched visitors for event",
        data: cleaned,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Internal Server Error",
        data: null,
      });
    }
  }
);
