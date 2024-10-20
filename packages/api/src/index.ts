// External packages
import http from "http";
import cors from "cors";
import express from "express";
import { Request, Response } from "express";
import { Server } from "socket.io";

// Shared packages
import prismaClient from "prisma-client";
import SocketService from "./socket";
import { publisher, subscriber } from "pubsub";
import { producer } from "worker-queue";

const app = express();
const server = http.createServer(app);

const io = new SocketService(server).io;
const PORT = process.argv[2] || process.env.PORT || 3000;

app.use(cors());
app.get("/", async (req: Request, res: Response) => {
  const messages = await prismaClient.message?.findMany();
  res.json({ success: "ok", messages });
});

server.listen(PORT, () => {
  console.log(`Server listenings to port ${PORT}: `);
});

async function main() {
  io.on("connection", async (socket) => {
    await producer.connect();
    socket.on("send-msg", async (data: any) => {
      await publisher.publish("MESSAGE", data);
      // io.emit("receive-msg", `New ${data}`);
    });
  });

  subscriber.subscribe("MESSAGE", async (message) => {
    io.emit("receive-msg", `Received ${message}`);
    await producer.send({
      topic: "MESSAGES",
      messages: [
        {value: message },
      ],
    })
  });
}

main();