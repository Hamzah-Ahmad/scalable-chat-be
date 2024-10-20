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
exports.default = initializeConsumer;
const prisma_client_1 = __importDefault(require("prisma-client"));
const client_1 = __importDefault(require("./client"));
const queueConsumer = client_1.default.consumer({ groupId: "queue-conumser-1" });
function initializeConsumer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield queueConsumer.connect();
        yield queueConsumer.subscribe({
            topic: "MESSAGES",
            fromBeginning: true,
        });
        yield queueConsumer.run({
            autoCommit: false,
            eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                var _b;
                console.log("Reached here! ");
                try {
                    console.log("And here! ");
                    yield prisma_client_1.default.message.create({
                        data: {
                            text: ((_b = message.value) === null || _b === void 0 ? void 0 : _b.toString()) || "",
                        },
                    });
                    yield queueConsumer.commitOffsets([
                        {
                            topic: "MESSAGES",
                            offset: (parseInt(message.offset) + 1).toString(),
                            partition: partition,
                        },
                    ]);
                }
                catch (err) {
                    console.log("DB error");
                }
            }),
        });
    });
}
