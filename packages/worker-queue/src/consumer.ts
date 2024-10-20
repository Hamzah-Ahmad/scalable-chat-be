import prismaClient from "prisma-client";
import kafkaClient from "./client";

const queueConsumer = kafkaClient.consumer({ groupId: "queue-conumser-1" });

export default async function initializeConsumer() {
  await queueConsumer.connect();
  await queueConsumer.subscribe({
    topic: "MESSAGES",
    fromBeginning: true,
  });

  await queueConsumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      try {

        await prismaClient.message.create({
          data: {
            text: message.value?.toString() || "",
          },
        });

        await queueConsumer.commitOffsets([
          {
            topic: "MESSAGES",
            offset: (parseInt(message.offset) + 1).toString(),
            partition: partition,
          },
        ]);
      } catch (err) {
        console.log("DB error");
      }
    },
  });
}
