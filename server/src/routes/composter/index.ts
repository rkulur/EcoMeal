import { FastifyInstance, RouteHandler } from "fastify";
import {
  getExpiredDonations,
  claimExpiredDonation,
  markComposted,
  getCompostHistory,
  getComposterImpact,
} from "../../controllers/composter";

export async function composterRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/expired-donations",
    { preHandler: [fastify.authenticate, fastify.isComposter] },
    getExpiredDonations,
  );

  fastify.post(
    "/claim-expired/:donationId",
    { preHandler: [fastify.authenticate, fastify.isComposter] },
    claimExpiredDonation as RouteHandler,
  );

  fastify.patch(
    "/update-status/:donationId",
    { preHandler: [fastify.authenticate, fastify.isComposter] },
    markComposted as RouteHandler,
  );

  fastify.get(
    "/history",
    { preHandler: [fastify.authenticate, fastify.isComposter] },
    getCompostHistory,
  );

  fastify.get(
    "/impact",
    { preHandler: [fastify.authenticate, fastify.isComposter] },
    getComposterImpact,
  );
}
