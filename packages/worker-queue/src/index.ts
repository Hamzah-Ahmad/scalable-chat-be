import { Kafka } from "kafkajs";
import { initializeQueue } from "./admin";
import initializeConsumer from "./consumer";
import kafkaClient from "./client";

// const kafka = new Kafka({
//   clientId: "worker-queue",
//   brokers: ["localhost:9092"],
// });

export const producer = kafkaClient.producer();

// async function main() {
//   await consumer.connect();
//   await consumer.subscribe({
//     topic: "messages",
//     fromBeginning: true,
//   });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log(
//         `Consumer Log: ${message?.value?.toString()}, Partition: ${partition}`
//       );
//     },
//   });
// }

async function main() {
  await initializeQueue();
  await initializeConsumer();
}
main();
