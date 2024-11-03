// External packages
import http from "http";
import cors from "cors";
import express from "express";

// Shared packages
import SocketService from "./socket";
import { publisher, subscriber } from "pubsub";
import { producer } from "worker-queue";

const app = express();
const server = http.createServer(app);

const io = new SocketService(server).io;
const PORT = process.argv[2] || process.env.PORT || 3000;

app.use(cors());

server.listen(PORT, () => {
  console.log(`Server listenings to port ${PORT}: `);
});

async function main() {
  await producer.connect();
  io.on("connection", async (socket) => {
    socket.on("send-msg", async (data: any) => {
      await publisher.publish("MESSAGE", data);
    });
  });

  subscriber.subscribe("MESSAGE", async (message) => {
    io.emit("receive-msg", `Received ${message}`);
    await producer.send({
      topic: "MESSAGES",
      messages: [{ value: message }],
    });
  });
}

main();
