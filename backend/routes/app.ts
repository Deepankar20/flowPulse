import { Router } from "express";
import type { Request, Response } from "express";
import prisma from "../db/db";

export const appRouter = Router();

appRouter.post("/clerk-signup-webhook", async (req: Request, res: Response) => {
  try {
    const data = req.body.data;

    let hashedPassword = "";
    const userId = data.id;
    const email = data.email_addresses[0].email_address;
    const name = data.first_name;

    if (data.password_enabled) {
      hashedPassword = data.password;
    }

    const newAppOwner = await prisma.appOwner.create({
      data: {
        email,
        clerkUserId: userId,
        name,
        hashedPassword,
      },
    });

    if (!newAppOwner) {
      return res.status(401).json({
        msg: "not created",
        data: null,
      });
    }
    console.log(newAppOwner);

    return res.status(200).json({
      msg: "user created",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "server error",
      data: null,
    });
  }
});

