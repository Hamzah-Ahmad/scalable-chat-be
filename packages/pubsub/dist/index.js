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
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriber = exports.publisher = void 0;
const redis_1 = require("redis");
exports.publisher = (0, redis_1.createClient)();
exports.subscriber = (0, redis_1.createClient)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.publisher.connect();
        yield exports.subscriber.connect();
        // await subscriber.subscribe("MESSAGE", (message) =>
        //   console.log(`LOGGING MESSAGE: ${message}`)
        // );
    });
}
main();
