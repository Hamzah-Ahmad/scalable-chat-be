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
const express = require("express");
const socket_io_1 = require("socket.io");
// Shared packages
const prisma_client_1 = __importDefault(require("prisma-client"));
const app = express();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const messages = yield ((_a = prisma_client_1.default.message) === null || _a === void 0 ? void 0 : _a.findMany());
    return res.json({ success: "ok!!", messages });
}));
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("send-msg", (data) => {
        console.log("data: ", data);
        io.emit("receive-msg", data);
    });
});
server.listen(3000, () => {
    console.log("listening on *:3000");
});
