import { Server } from "socket.io";

class SocketService {
  private _io: Server;
  constructor(httpServer: any) {
    this._io = new Server(httpServer, {
      cors: {
        origin: "*",
      },
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
