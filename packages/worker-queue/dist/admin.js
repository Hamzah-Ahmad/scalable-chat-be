"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeQueue = initializeQueue;
const client_1 = __importDefault(require("./client"));
function createTopicIfNotExists(topic_1) {
    return __awaiter(this, arguments, void 0, function* (topic, numPartitions = 1, replicationFactor = 1) {
        const admin = client_1.default.admin();
        try {
            yield admin.connect();
            const topics = yield admin.listTopics();
            if (!topics.includes(topic)) {
                yield admin.createTopics({
                    topics: [
                        {
                            topic,
                            numPartitions,
                            replicationFactor,
                        },
                    ],
                });
                console.log(`Topic ${topic} created successfully`);
            }
            else {
                console.log(`Topic ${topic} already exists`);
            }
        }
        catch (error) {
            console.error(`Error creating topic ${topic}:`, error);
        }
        finally {
            yield admin.disconnect();
        }
    });
}
function initializeQueue() {
    return __awaiter(this, void 0, void 0, function* () {
        yield createTopicIfNotExists("MESSAGES");
    });
}
