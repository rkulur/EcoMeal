import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { errorResponse } from "../utils/responseWrapper";
import { JwtPayload } from "../types/jwt";

export default fp(async function (fastify: FastifyInstance) {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET as string,
  });

  fastify.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        const coded = await request.jwtVerify<JwtPayload>();
        request.user = coded;
      } catch (err) {
        reply.status(401).send(errorResponse("Error", err));
      }
    },
  );
});
