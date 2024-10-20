import { Kafka } from "kafkajs";
import { initializeQueue } from "./admin";
import initializeConsumer from "./consumer";
import kafkaClient from "./client";

// const kafka = new Kafka({
//   clientId: "worker-queue",
//   brokers: ["localhost:9092"],
// });

export const producer = kafkaClient.producer();

async function main() {
  await initializeQueue();
  await initializeConsumer();
}
main();
