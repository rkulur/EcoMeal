import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    isDonor(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    isNgo(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    isCareHome(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    isComposter(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    isAdmin(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: string; role: string };
    user: {
      id: string;
      role: string;
    };
  }
}
