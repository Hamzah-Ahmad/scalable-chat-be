import { Response } from "express";
import prismaClient from "prisma-client";
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.get("/", async (req: Request, res: Response) => {
  const posts = await prismaClient.post?.findMany();
  return res.json({ success: "ok!!", posts });
});

app.listen(PORT, () => console.log(`API is listening on port ${PORT}`));
