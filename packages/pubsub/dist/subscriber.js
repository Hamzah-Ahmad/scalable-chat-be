"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const subscriber = (0, redis_1.createClient)();
exports.default = subscriber;
