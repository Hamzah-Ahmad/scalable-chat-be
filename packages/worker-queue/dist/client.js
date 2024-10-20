"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const kafkaClient = new kafkajs_1.Kafka({
    clientId: "worker-queue",
    brokers: ["localhost:9092"],
});
exports.default = kafkaClient;
