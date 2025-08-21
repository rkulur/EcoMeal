import { FastifyReply, FastifyRequest } from "fastify";
import { Donation, DonationDoc } from "../../models/Donation.model";
import {
  FoodRequest,
  FoodRequestDoc,
  FoodRequestType,
} from "../../models/FoodRequest.model";
import { successResponse, errorResponse } from "../../utils/responseWrapper";
import { Types } from "mongoose";

export const markDonationReceived = async (
  request: FastifyRequest<{ Params: { donationId: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { donationId } = request.params;
    const careHomeId = request.user.id;
    const foodRequest = await FoodRequest.findOneAndUpdate(
      { assignedDonation: donationId, requester: careHomeId },
      { status: "delivered", deliveryDate: new Date() },
      { new: true },
    );
    if (!foodRequest) {
      return reply.code(404).send(errorResponse("Food request not found"));
    }
    await Donation.findByIdAndUpdate(donationId, {
      status: "delivered",
      deliveryDate: new Date(),
    });
    reply.send(successResponse(foodRequest, "Donation received successfully"));
  } catch (err) {
    reply.code(500).send(errorResponse("Internal server error", err));
  }
};

export const approveDonation = async (
  request: FastifyRequest<{
    Params: { donationId: string };
    Body: { requestId: string };
  }>,
  reply: FastifyReply,
) => {
  try {
    const { donationId } = request.params;
    const { requestId } = request.body;
    const carehomeId = request.user.id;

    const foodRequest = (await FoodRequest.findById(
      requestId,
    )) as FoodRequestDoc;
    const donation = (await Donation.findById(donationId)) as DonationDoc;
    if (!foodRequest) {
      return reply
        .code(404)
        .send(
          errorResponse("Food request not found", { foodRequest, requestId }),
        );
    }
    if (!donation) {
      return reply.code(404).send(errorResponse("Donation not found"));
    }

    donation.assignedRequest = new Types.ObjectId(requestId);
    donation.assignedCareHome = new Types.ObjectId(carehomeId);
    donation.status = "assigned";
    await donation.save();

    foodRequest.assignedDonation = new Types.ObjectId(donationId);
    foodRequest.status = "approved";
    await foodRequest.save();
    reply.send(
      successResponse({ foodRequest, donation }, "Donation confirmed"),
    );
  } catch (err) {
    reply.code(500).send(errorResponse("Failed to confirm receipt", err));
  }
};

export const rejectDonation = async (
  request: FastifyRequest<{
    Body: {
      requestId: string;
      reasonCode: "already_sourced" | "unsuitable_donation";
      note: string;
    };
    Params: {
      donationId: string;
    };
  }>,
  reply: FastifyReply,
) => {
  const { reasonCode, note, requestId } = request.body;
  const { donationId } = request.params;

  try {
    const foodRequest = (await FoodRequest.findById(
      requestId,
    )) as FoodRequestDoc;
    if (!foodRequest) {
      return reply.code(404).send(errorResponse("Food request not found"));
    }
    const donation = (await Donation.findById(donationId)) as DonationDoc;
    if (!donation) {
      return reply.code(404).send(errorResponse("Donation not found"));
    }

    if (reasonCode === "already_sourced") {
      foodRequest.status = "cancelled";
      donation.status = "pending";
      donation.assignedRequest = null;
    } else if (reasonCode === "unsuitable_donation") {
      foodRequest.status = "pending";
      donation.status = "pending";
      donation.assignedRequest = null;
    }

    foodRequest.rejectedDonations.push(donation._id);
    foodRequest.rejectionHistory.push({ donationId, reasonCode, note });
    await donation.save();
    await foodRequest.save();
    reply.send(successResponse(null, "Donation rejected successfully"));
  } catch (err) {
    reply.code(500).send(errorResponse("Internal server error", err));
  }
};

export const getRequestHistory = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const careHomeId = request.user.id;

    const requests = await FoodRequest.find({
      requester: careHomeId,
    })
      .populate("assignedDonation assignedNgo")
      .sort({ updatedAt: -1 });

    reply.send(successResponse(requests));
  } catch (err) {
    reply
      .code(500)
      .send(errorResponse("Failed to fetch donation history", err));
  }
};

export const requestDonation = async (
  request: FastifyRequest<{ Body: FoodRequestType }>,
  reply: FastifyReply,
) => {
  try {
    const careHomeId = request.user.id;
    const { requestedItems, comments } = request.body;

    const requestDoc = await FoodRequest.create({
      requester: careHomeId,
      requestedItems,
      comments,
    });

    reply.code(201).send(successResponse(requestDoc, "Request submitted"));
  } catch (err) {
    reply.code(500).send(errorResponse("Failed to submit food request", err));
  }
};

export const getRequestedDonations = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const careHomeId = request.user.id;

    const requests = await FoodRequest.find({
      requester: careHomeId,
      status: { $in: ["pending", "approved"] },
    }).sort({ createdAt: -1 });

    reply.send(successResponse(requests));
  } catch (err) {
    reply
      .code(500)
      .send(errorResponse("Failed to fetch requested donations", err));
  }
};
