import type { NextFunction, Request, Response } from "express";
import prisma from "../db/db";
import type { AuthRequest } from "../types";

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    let token: string | undefined = "";

    if (!authHeader) {
      return res.status(401).json({
        msg: "unauthorised",
        data: null,
      });
    }

    if (authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        msg: "unauthorised",
        data: null,
      });
    }

    const appOwner = await prisma.appOwner.findUnique({
      where: {
        clerkUserId: token,
      },
    });

    if (!appOwner) {
      return res.status(404).json({
        msg: "unauthorised",
        data: null,
      });
    }

    req.user = {
      id: appOwner.id,
      email: appOwner.email,
      name: appOwner.name,
      clerkUserId: appOwner.clerkUserId,
    };
    return next();
  } catch (error) {
    return res.status(500).json({
      msg: "internal server error",
      data: null,
    });
  }
};
