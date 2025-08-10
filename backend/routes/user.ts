import { Router } from "express";
import type { Request, Response } from "express";
import { identifyReqBodySchema } from "../types";
import prisma from "../db/db";

export const userRouter = Router();

userRouter.post("/identify", async (req: Request, res: Response) => {
  const data = identifyReqBodySchema.safeParse(req.body);

  if (data.error) {
    res.status(400).json({ msg: "Bad Request", data: null });
    return;
  }

  try {
    const [newUser, existingUser] = await prisma.$transaction(async (tx) => {
      const appExist = await prisma.project.findFirst({
        where: {
          apiKey: data.data.apiKey,
        },
      });

      const existingUser = await prisma.user.findUnique({
        where: {
          email: data.data.email,
        },
      });

      if (existingUser) {
        return [null, existingUser];
      }

      const newUser = await prisma.user.create({
        data: {
          properties: data.data.properties,
          email: data.data.email,
          name: data.data.name,
        },
      });

      const updateEvents = await prisma.event.updateMany({
        where: {
          distinctId: data.data.distinctId,
          userId: null,
        },
        data: {
          userId: newUser.id,
        },
      });

      return [newUser, existingUser];
    });

    if (!newUser && existingUser) {
      return res.status(200).json({
        msg: "successfully identified user",
        data: {
          userId: existingUser.id,
        },
      });
    }

    return res.status(200).json({
      msg: "successfully identified user",
      data: {
        userId: newUser.id,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", data: null });
    console.log(error);
  }
});
