import { FastifyInstance, RouteHandlerMethod } from "fastify";
import { googleAuth, login } from "../../controllers/auth";
import careHomeAuthRoutes from "./carehome.routes";
import donorAuthRoutes from "./donor.routes";
import ngoAuthRoutes from "./ngo.routes";
import composterAuthRoutes from "./composter.routes";

declare module "fastify" {
  interface FastifyRequest {
    jwt: {
      sign: (payload: { id: unknown }) => string;
    };
  }
}

const oauthSchema = {
  querystring: {
    type: "object",
    required: ["role"],
    properties: {
      role: {
        type: "string",
        enum: ["donor", "ngo", "carehome", "composter"],
      },
    },
  },
};

const loginSchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
  },
};

async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/google",
    { schema: oauthSchema },
    googleAuth as RouteHandlerMethod,
  );
  fastify.post("/login", { schema: loginSchema }, login as RouteHandlerMethod);
  await fastify.register(donorAuthRoutes, { prefix: "/register" });
  await fastify.register(careHomeAuthRoutes, { prefix: "/register" });
  await fastify.register(ngoAuthRoutes, { prefix: "/register" });
  await fastify.register(composterAuthRoutes, { prefix: "/register" });
}

export default authRoutes;
