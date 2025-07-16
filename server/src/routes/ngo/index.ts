import { FastifyInstance, RouteHandler } from "fastify";
import {
  assignDonation,
  claimDonation,
  getAssignedDonations,
  getAvailableDonations,
  getNGOImpact,
  getSuggestedCareHomes,
  updateDeliveryStatus,
} from "../../controllers/ngo";

export default async function ngoRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/available-donations",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    getAvailableDonations,
  );
  fastify.post(
    "/claim-donation/:donationId",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    claimDonation as RouteHandler,
  );
  fastify.get(
    "/suggest-carehomes/:donationId",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    getSuggestedCareHomes as RouteHandler,
  );
  fastify.post(
    "/assign-donation/:donationId",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    assignDonation as RouteHandler,
  );
  fastify.get(
    "/assigned-donations",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    getAssignedDonations as RouteHandler,
  );
  fastify.patch(
    "/update-status/:donationId",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    updateDeliveryStatus as RouteHandler,
  );
  fastify.get(
    "/impact",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    getNGOImpact as RouteHandler,
  );
}
