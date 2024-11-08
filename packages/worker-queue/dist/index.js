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
exports.producer = void 0;
const admin_1 = require("./admin");
const consumer_1 = __importDefault(require("./consumer"));
const client_1 = __importDefault(require("./client"));
// const kafka = new Kafka({
//   clientId: "worker-queue",
//   brokers: ["localhost:9092"],
// });
exports.producer = client_1.default.producer();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, admin_1.initializeQueue)();
        yield (0, consumer_1.default)();
    });
}
main();
