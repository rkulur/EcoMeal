import { FastifyRequest, FastifyReply } from "fastify";
import { Donation } from "../../models/Donation.model";
import { successResponse, errorResponse } from "../../utils/responseWrapper";
import ComposterModel from "../../models/Composter.model";

export const getExpiredDonations = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const expiredDonations = await Donation.find({
      status: "expired",
      isExpired: true,
    }).populate("donor");

    reply.send(successResponse(expiredDonations));
  } catch (err) {
    reply
      .code(500)
      .send(errorResponse("Failed to fetch expired donations", err));
  }
};

export const claimExpiredDonation = async (
  request: FastifyRequest<{ Params: { donationId: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { donationId } = request.params;
    const composterId = request.user.id;

    const donation = await Donation.findOneAndUpdate(
      { _id: donationId, status: "expired" },
      { acceptedBy: composterId, status: "picked_up" },
      { new: true },
    );

    if (!donation) {
      return reply
        .code(404)
        .send(errorResponse("Donation not found or already claimed"));
    }

    reply.send(successResponse(donation, "Donation claimed by composter"));
  } catch (err) {
    reply.code(500).send(errorResponse("Failed to claim donation", err));
  }
};

export const markComposted = async (
  request: FastifyRequest<{ Params: { donationId: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { donationId } = request.params;

    const donation = await Donation.findByIdAndUpdate(
      donationId,
      { status: "cancelled" }, // Assuming composted donations are marked as cancelled
      { new: true },
    );

    if (!donation) {
      return reply.code(404).send(errorResponse("Donation not found"));
    }

    reply.send(successResponse(donation, "Donation marked as composted"));
  } catch (err) {
    reply.code(500).send(errorResponse("Failed to update compost status", err));
  }
};

export const getCompostHistory = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const composterId = request.user.id;

    const donations = await Donation.find({
      acceptedBy: composterId,
      status: "cancelled",
    }).populate("donor");

    reply.send(successResponse(donations));
  } catch (err) {
    reply
      .code(500)
      .send(errorResponse("Failed to fetch composting history", err));
  }
};

export const getComposterImpact = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const composterId = request.user.id;

    const totalComposted = await Donation.countDocuments({
      acceptedBy: composterId,
      status: "cancelled",
    });

    reply.send(successResponse({ totalComposted }));
  } catch (err) {
    reply.code(500).send(errorResponse("Failed to fetch impact data", err));
  }
};

export const getPersonalDetails = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const composterId = request.user.id;

    const composter = await ComposterModel.findById(composterId, {
      name: 1,
      email: 1,
      phone: 1,
    });

    reply.send(
      successResponse(composter, "Successfully fetched personal details"),
    );
  } catch (err) {
    reply
      .code(500)
      .send(errorResponse("Failed to fetch personal details", err));
  }
};
