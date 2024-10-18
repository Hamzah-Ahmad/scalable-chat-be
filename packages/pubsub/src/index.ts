import { createClient } from 'redis';
import subscriber from './subscriber';

async function main() {
    await subscriber.connect();

    await subscriber.subscribe('MESSAGE', (message) => console.log(`LOGGING MESSAGE: ${message}`))
}



// main();

function PubSubTest() {
    console.log("PUB SUB TEST@@")
}

export default PubSubTest;