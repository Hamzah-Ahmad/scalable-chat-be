import kafkaClient from "./client";

async function createTopicIfNotExists(
  topic: string,
  numPartitions = 1,
  replicationFactor = 1
) {
  const admin = kafkaClient.admin();
  try {
    await admin.connect();

    const topics = await admin.listTopics();

    if (!topics.includes(topic)) {
      await admin.createTopics({
        topics: [
          {
            topic,
            numPartitions,
            replicationFactor,
          },
        ],
      });
      console.log(`Topic ${topic} created successfully`);
    } else {
      console.log(`Topic ${topic} already exists`);
    }
  } catch (error) {
    console.error(`Error creating topic ${topic}:`, error);
  } finally {
    await admin.disconnect();
  }
}

export async function initializeQueue() {
  await createTopicIfNotExists("MESSAGES");
}
