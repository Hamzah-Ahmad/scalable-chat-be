// External packages
import http from "http";
import cors from "cors";
const express = require("express");
import { Response } from "express";
import { Server } from "socket.io";

// Shared packages
import prismaClient from "prisma-client";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const PORT = process.env.PORT || 3000;

app.use(cors());
app.get("/", async (req: Request, res: Response) => {
  const messages = await prismaClient.message?.findMany();
  return res.json({ success: "ok!!", messages });
});

io.on("connection", (socket) => {
  socket.on("send-msg", (data: any) => {
    io.emit("receive-msg", data)
  });
});

server.listen(3000, () => {
  console.log("Server listening to port 3000");
});
