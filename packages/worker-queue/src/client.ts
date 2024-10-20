import { Kafka } from "kafkajs";

const kafkaClient = new Kafka({
  clientId: "worker-queue",
  brokers: ["localhost:9092"],
});

export default kafkaClient;
