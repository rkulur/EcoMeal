import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify/fastify";

export function registerErrorHandler(app: FastifyInstance): void {
  app.setErrorHandler(
    (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
      const isProd = process.env.NODE_ENV === "production";
      request.log.error(error, "Unhandled Error");
      reply.status(error.statusCode || 500).send({
        status: "error",
        message: error.message || "Internal Server Error",
        ...(isProd ? {} : { stack: error.stack }),
      });
    },
  );
}
