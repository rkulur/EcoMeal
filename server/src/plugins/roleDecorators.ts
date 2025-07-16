import fp from "fastify-plugin";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify/fastify";
import { errorResponse } from "../utils/responseWrapper";
import { IUser } from "../models/User.model";

export default fp(async (fastify: FastifyInstance) => {
  fastify.decorate(
    "isDonor",
    async (request: FastifyRequest, reply: FastifyReply) => {
      await request.jwtVerify();
      const user = request.user as IUser;
      if (user.role != "donor") {
        return reply
          .code(403)
          .send(errorResponse("Access restricted to Donors"));
      }
    },
  );

  fastify.decorate(
    "isNgo",
    async (request: FastifyRequest, reply: FastifyReply) => {
      await request.jwtVerify();
      const user = request.user as IUser;
      if (user.role != "ngo") {
        return reply.code(403).send(errorResponse("Access restricted to NGOs"));
      }
    },
  );

  fastify.decorate(
    "isCareHome",
    async (request: FastifyRequest, reply: FastifyReply) => {
      await request.jwtVerify();
      const user = request.user as IUser;
      if (user.role != "carehome") {
        return reply
          .code(403)
          .send(errorResponse("Access restricted to Care Homes", user.role));
      }
    },
  );

  fastify.decorate(
    "isComposter",
    async (request: FastifyRequest, reply: FastifyReply) => {
      await request.jwtVerify();
      const user = request.user as IUser;
      if (user.role != "composter") {
        return reply
          .code(403)
          .send(errorResponse("Access restricted to Composters"));
      }
    },
  );

  fastify.decorate(
    "isAdmin",
    async (request: FastifyRequest, reply: FastifyReply) => {
      await request.jwtVerify();
      const user = request.user as IUser;
      if (user.role != "composter") {
        return reply
          .code(403)
          .send(errorResponse("Access restricted to Admins"));
      }
    },
  );
});
