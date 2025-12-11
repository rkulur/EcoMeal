import { FastifyInstance, RouteHandler } from "fastify";
import {
  assignDonation,
  claimDonation,
  getAssignedDonations,
  getAvailableDonations,
  getCarehomeDetailsById,
  getNGOImpact,
  getOngoingDonations,
  getPastDonations,
  getPendingDonations,
  getPickedUpDonations,
  getSuggestedCareHomes,
  markAsPickedUp,
  markDonationAsDelivered,
  setDonationExpiry,
  updateDeliveryStatus,
} from "../../controllers/ngo";

export default async function ngoRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/available-donations",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    getAvailableDonations,
  );

  fastify.get(
    "/pending-donations",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    getPendingDonations,
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

  fastify.patch(
    "/set-expiry/:donationId",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    setDonationExpiry as RouteHandler,
  );

  fastify.patch(
    "/mark-as-picked-up/:donationId",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    markAsPickedUp as RouteHandler,
  );

  fastify.get(
    "/picked-up-donations",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    getPickedUpDonations as RouteHandler,
  );

  fastify.get(
    "/ongoing-donations",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    getOngoingDonations as RouteHandler,
  );

  fastify.get(
    "/assigned-donations",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    getAssignedDonations as RouteHandler,
  );

  fastify.get(
    "/carehome-details/:carehomeId",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    getCarehomeDetailsById as RouteHandler,
  );

  fastify.patch(
    "/mark-as-delivered/:donationId",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    markDonationAsDelivered as RouteHandler,
  );

  fastify.get(
    "/past-donations",
    { preHandler: [fastify.authenticate, fastify.isNgo] },
    getPastDonations as RouteHandler,
  );
}
