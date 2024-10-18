"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class SocketService {
    constructor(httpServer) {
        this._io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: "*",
            },
        });
    }
    get io() {
        return this._io;
    }
}
exports.default = SocketService;
