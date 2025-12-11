import { FastifyInstance, RouteHandler } from "fastify";
import {
  approveDonation,
  getAvailableDonations,
  getOngoingDeliveries,
  getPersonalDetails,
  getRequestHistory,
  getRequestedDonations,
  markDonationAsReceived,
  rejectDonation,
  requestDonation,
} from "../../controllers/carehome";
import { getDonationById } from "../../controllers/donor";

export default async function carehomeRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/available-donations",
    {
      preHandler: [fastify.authenticate, fastify.isCareHome],
    },
    getAvailableDonations,
  );

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
    "/request-donation/:donationId",
    { preHandler: [fastify.authenticate, fastify.isCareHome] },
    requestDonation as RouteHandler,
  );

  fastify.patch(
    "/donation-received/:donationId",
    { preHandler: [fastify.authenticate, fastify.isCareHome] },
    markDonationAsReceived as RouteHandler,
  );

  fastify.get(
    "/history",
    { preHandler: [fastify.authenticate, fastify.isCareHome] },
    getRequestHistory as RouteHandler,
  );

  fastify.get(
    "/requested-donations",
    { preHandler: [fastify.authenticate, fastify.isCareHome] },
    getRequestedDonations as RouteHandler,
  );

  fastify.get(
    "/ongoing-deliveries",
    { preHandler: [fastify.authenticate, fastify.isCareHome] },
    getOngoingDeliveries as RouteHandler,
  );

  fastify.get(
    "/get-donation/:id",
    {
      preHandler: [fastify.authenticate, fastify.isCareHome],
    },
    getDonationById as RouteHandler,
  );

  fastify.get(
    "/personal-details",
    {
      preHandler: [fastify.authenticate, fastify.isCareHome],
    },
    getPersonalDetails as RouteHandler,
  );

  fastify.get("/impact", async (request, reply) => {
    reply.send({ message: "Not implemented" });
  });
}
