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
// External packages
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// Shared packages
const prisma_client_1 = __importDefault(require("prisma-client"));
const socket_1 = __importDefault(require("./socket"));
const pubsub_1 = require("pubsub");
const worker_queue_1 = require("worker-queue");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_1.default(server).io;
const PORT = process.argv[2] || process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const messages = yield ((_a = prisma_client_1.default.message) === null || _a === void 0 ? void 0 : _a.findMany());
    res.json({ success: "ok", messages });
}));
server.listen(PORT, () => {
    console.log(`Server listenings to port ${PORT}: `);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield worker_queue_1.producer.connect();
        io.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
            socket.on("send-msg", (data) => __awaiter(this, void 0, void 0, function* () {
                yield pubsub_1.publisher.publish("MESSAGE", data);
                // io.emit("receive-msg", `New ${data}`);
            }));
        }));
        pubsub_1.subscriber.subscribe("MESSAGE", (message) => __awaiter(this, void 0, void 0, function* () {
            io.emit("receive-msg", `Received ${message}`);
            yield worker_queue_1.producer.send({
                topic: "MESSAGES",
                messages: [
                    { value: message },
                ],
            });
        }));
    });
}
main();
