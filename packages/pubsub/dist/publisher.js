"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const publisher = (0, redis_1.createClient)();
exports.default = publisher;
// async function main() {
//     await publisher.connect();
//     await subscriber.connect();
//     await subscriber.subscribe('MESSAGE', (message) => console.log(`SUBSCRIBER: ${message}`))
// }
// main();
