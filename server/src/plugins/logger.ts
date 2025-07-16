import { FastifyBaseLogger } from "fastify/fastify";
import pino from "pino";

const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
}) as FastifyBaseLogger;

export default logger;
