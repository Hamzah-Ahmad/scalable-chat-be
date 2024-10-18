import { createClient } from 'redis';

const publisher = createClient();
export default publisher;
// async function main() {
//     await publisher.connect();
//     await subscriber.connect();

//     await subscriber.subscribe('MESSAGE', (message) => console.log(`SUBSCRIBER: ${message}`))
// }



// main();