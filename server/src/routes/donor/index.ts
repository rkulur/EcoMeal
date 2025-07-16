import { FastifyInstance } from "fastify/fastify";
import donationRoutes from "./donation.routes";
import { getDonorImpact } from "../../controllers/donor";

export default async function donorRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/impact",
    {
      preHandler: [fastify.authenticate, fastify.isDonor],
    },
    getDonorImpact,
  );
  await fastify.register(donationRoutes, { prefix: "/donation" });
}
