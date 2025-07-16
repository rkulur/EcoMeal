import cors from "@fastify/cors";
import dotenv from "dotenv";
import Fastify, { FastifyInstance } from "fastify";
import { connectDB } from "./config/db";
import authPlugin from "./plugins/auth";
import logger from "./plugins/logger";
import roleDecorators from "./plugins/roleDecorators";
import authRoutes from "./routes/auth";
import careHomeRoutes from "./routes/carehome";
import { composterRoutes } from "./routes/composter";
import donorRoutes from "./routes/donor";
import ngoRoutes from "./routes/ngo";
import { registerErrorHandler } from "./utils/errorHandler";

dotenv.config();

const server: FastifyInstance = Fastify({ logger });

server.addHook("onRequest", async (request, _) => {
  request.log.info(
    { method: request.method, url: request.url },
    "Incoming request",
  );
});

server.addHook("onResponse", async (request, reply) => {
  request.log.info(
    {
      method: request.method,
      url: request.url,
      statusCode: reply.statusCode,
    },
    "Request completed",
  );
});

registerErrorHandler(server);

server.register(cors, {
  origin: true,
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-session-id"],
});

server.register(authPlugin);
server.register(roleDecorators);

server.register(authRoutes, { prefix: "/api/v1/auth" });
server.register(donorRoutes, { prefix: "/api/v1/donor" });
server.register(ngoRoutes, { prefix: "/api/v1/ngo" });
server.register(careHomeRoutes, { prefix: "/api/v1/carehome" });
server.register(composterRoutes, { prefix: "/api/v1/compost" });

server.get("/health", async () => {
  return { status: "ok" };
});

const start = async (): Promise<void> => {
  try {
    await connectDB();
    await server.listen({
      port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
      host: "0.0.0.0",
    });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    server.log.info(`Server is running on ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
