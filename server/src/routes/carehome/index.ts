import { FastifyInstance, RouteHandler } from "fastify";
import {
  approveDonation,
  getDonationHistory,
  getRequestedDonations,
  markDonationReceived,
  rejectDonation,
  requestDonation,
} from "../../controllers/carehome";

export default async function carehomeRoutes(fastify: FastifyInstance) {
  fastify.get("/incoming-donations", async (request, reply) => {
    reply.send({ message: "Not implemented" });
  });

  fastify.patch(
    "/approve-donation/:donationId",
    { preHandler: [fastify.authenticate, fastify.isCareHome] },
    approveDonation as RouteHandler,
  );

  fastify.patch(
    "/reject-donation/:donationId",
    { preHandler: [fastify.authenticate, fastify.isCareHome] },
    rejectDonation as RouteHandler,
  );

  fastify.patch(
    "/donation-received/:donationId",
    { preHandler: [fastify.authenticate, fastify.isCareHome] },
    markDonationReceived as RouteHandler,
  );

  fastify.get(
    "/history",
    { preHandler: [fastify.authenticate, fastify.isCareHome] },
    getDonationHistory as RouteHandler,
  );

  fastify.post(
    "/request-donation",
    { preHandler: [fastify.authenticate, fastify.isCareHome] },
    requestDonation as RouteHandler,
  );

  fastify.get(
    "/requested-donations",
    { preHandler: [fastify.authenticate, fastify.isCareHome] },
    getRequestedDonations as RouteHandler,
  );

  fastify.get("/impact", async (request, reply) => {
    reply.send({ message: "Not implemented" });
  });
}
