import { FastifyReply, FastifyRequest } from "fastify/fastify";
import { errorResponse, successResponse } from "../../utils/responseWrapper";
import { Donation, DonationDoc } from "../../models/Donation.model";
import { ObjectId, Types } from "mongoose";
import { FoodRequest, FoodRequestDoc } from "../../models/FoodRequest.model";
import NGOModel from "../../models/NGO.model";

const allowedStatuses = [
  "pending",
  "accepted",
  "assigned",
  "picked_up",
  "delivered",
  "expired",
  "cancelled",
] as const;

type DonationStatus = (typeof allowedStatuses)[number];

export async function getAvailableDonations(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const ngoId = request.user.id;
    const ngo = await NGOModel.findById(ngoId).lean();
    if (!ngo || !ngo.locationGeo) {
      return reply
        .code(404)
        .send(errorResponse("NGO not found or missing location data."));
    }

    const [lng, lat] = ngo.locationGeo.coordinates;
    const donations = await Donation.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lng, lat] },
          distanceField: "distance",
          spherical: true,
          maxDistance: 15000,
        },
      },
      {
        $match: { status: "pending" },
      },
      {
        $lookup: {
          from: "users",
          localField: "donor",
          foreignField: "_id",
          as: "donorInfo",
        },
      },
      {
        $unwind: "$donorInfo",
      },
      {
        $project: {
          foodItems: 1,
          pickupAddress: 1,
          status: 1,
          distance: 1,
          "donorInfo.name": 1,
          "donorInfo.email": 1,
          "donorInfo.phone": 1,
          donationCoordinates: "$locationGeo.coordinates",
        },
      },
      {
        $limit: 10,
      },
    ]);

    return reply.code(200).send(successResponse(donations));
  } catch (err) {
    console.error(err);
    return reply.code(500).send(errorResponse("Internal Sheesh Error", err));
  }
}

export async function claimDonation(
  request: FastifyRequest<{ Params: { donationId: string } }>,
  reply: FastifyReply,
) {
  const { donationId } = request.params;
  const ngoId = request.user?.id;

  try {
    const donation = (await Donation.findOne({
      _id: donationId,
      isDeleted: false,
    })) as DonationDoc;

    if (!donation || donation.status !== "pending") {
      return reply.code(404).send(errorResponse("Donation not available"));
    }

    donation.status = "accepted";
    donation.acceptedBy = new Types.ObjectId(ngoId);
    await donation.save();

    return reply.code(200).send(successResponse(donation, "Donation claimed"));
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error", err));
  }
}

export async function getSuggestedCareHomes(
  request: FastifyRequest<{ Params: { donationId: string } }>,
  reply: FastifyReply,
) {
  try {
    // TODO: AI logic for carehome suggestion
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error"));
  }
}

export async function assignDonation(
  request: FastifyRequest<{
    Params: { donationId: string };
    Body: { careHomeId: string; requestId: string };
  }>,
  reply: FastifyReply,
) {
  const { careHomeId, requestId } = request.body;
  const { donationId } = request.params;
  const ngoId = request.user?.id;

  try {
    const foodRequest = (await FoodRequest.findOne({
      _id: requestId,
      requester: new Types.ObjectId(careHomeId),
      status: "pending",
    })) as FoodRequestDoc;

    const donation = (await Donation.findOne({
      _id: donationId,
      isDeleted: false,
    })) as DonationDoc;

    if (!foodRequest) {
      return reply
        .code(404)
        .send(
          errorResponse("No pending food request found for this care home"),
        );
    }

    if (!donation) {
      return reply.code(404).send(errorResponse("Donation not found"));
    }

    foodRequest.assignedNgo = new Types.ObjectId(ngoId.toString());
    foodRequest.assignedDonation = new Types.ObjectId(donationId.toString());
    foodRequest.status = "pending";

    donation.assignedCareHome = new Types.ObjectId(careHomeId.toString());
    donation.assignedRequest = new Types.ObjectId(requestId.toString());

    await foodRequest.save();

    return reply
      .code(200)
      .send(
        successResponse(
          foodRequest,
          "Donation assigned to CareHome successfully",
        ),
      );
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error"));
  }
}

export async function getAssignedDonations(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const ngoId = request.user?.id;
    if (!ngoId) {
      return reply.code(403).send(errorResponse("Unauthorized"));
    }
    const donations = await Donation.find({
      acceptedBy: new Types.ObjectId(ngoId.toString()),
    });
    return reply.code(200).send(successResponse(donations));
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error"));
  }
}

export async function updateDeliveryStatus(
  request: FastifyRequest<{
    Params: { donationId: string };
    Body: { status: string };
  }>,
  reply: FastifyReply,
) {
  try {
    const { donationId } = request.params;
    const status = request.body.status as DonationStatus;
    const ngoId = request.user?.id;

    if (!allowedStatuses.includes(status as DonationStatus)) {
      return reply.code(400).send(
        errorResponse("Invalid donation status", {
          validStatuses: allowedStatuses,
        }),
      );
    }
    const donation = (await Donation.findById(donationId)) as DonationDoc;
    if (!donation) {
      return reply.code(403).send(errorResponse("Donation not found"));
    }
    if (donation.acceptedBy?.toString() !== ngoId) {
      return reply.code(403).send(errorResponse("Unauthorized"));
    }
    donation.status = status;
    await donation.save();
    return reply.code(200).send(successResponse(donation, "Status updated"));
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error"));
  }
}

export async function getNGOImpact(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error"));
  }
}
