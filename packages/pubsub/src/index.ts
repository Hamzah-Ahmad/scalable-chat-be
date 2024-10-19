import { createClient } from "redis";

export const publisher = createClient();
export const subscriber = createClient();

async function main() {
  await publisher.connect()
  await subscriber.connect();
}

main();
