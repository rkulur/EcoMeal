import { FastifyReply, FastifyRequest } from "fastify";
import { Types } from "mongoose";
import {
  default as CareHome,
  default as CareHomeModel,
} from "../../models/CareHome.model";
import { Donation, DonationDoc } from "../../models/Donation.model";
import { FoodRequest, FoodRequestDoc } from "../../models/FoodRequest.model";
import { errorResponse, successResponse } from "../../utils/responseWrapper";

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
    } else if (reasonCode === "unsuitable_donation") {
      foodRequest.status = "pending";
      donation.status = "pending";
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
  request: FastifyRequest<{ Params: { donationId: string } }>,
  reply: FastifyReply,
) => {
  try {
    const careHomeId = request.user.id;
    const { donationId } = request.params;

    const donation = (await Donation.findById(donationId)) as DonationDoc;

    if (!donation) {
      reply.code(400).send(errorResponse("Donation not found"));
    }

    donation.requestedCarehomes.push({
      carehomeId: new Types.ObjectId(careHomeId),
    });
    donation.save();

    reply.code(201).send(successResponse("Request submitted successfully"));
  } catch (err) {
    reply.code(500).send(errorResponse("Failed to submit food request", err));
  }
};

export const getRequestedDonations = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const carehomeId = request.user.id;

    // const requestedDonations = await Donation.find({
    //   "requestedCarehomes.carehomeId": new Types.ObjectId(carehomeId),
    // })
    //   .sort({ createdAt: -1 })
    //   .populate("acceptedBy", "name email profilePicture")
    //   .lean();

    const requestedDonations = await Donation.aggregate([
      {
        $match: {
          "requestedCarehomes.carehomeId": new Types.ObjectId(carehomeId),
        },
      },
      {
        $addFields: {
          requestedCarehomes: {
            $filter: {
              input: "$requestedCarehomes",
              as: "rc",
              cond: {
                $eq: ["$$rc.carehomeId", new Types.ObjectId(carehomeId)],
              },
            },
          },
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "acceptedBy",
          foreignField: "_id",
          as: "acceptedBy",
        },
      },
      {
        $unwind: {
          path: "$acceptedBy",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "donor",
          foreignField: "_id",
          as: "donor",
        },
      },
      {
        $unwind: {
          path: "$donor",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "acceptedBy.name": 1,
          "acceptedBy.email": 1,
          "acceptedBy.profilePicture": 1,
          "donor.name": 1,
          "donor.profilePicture": 1,
          "donor.location.state": 1,
          "donor.location.district": 1,
          "donor.location.city": 1,
          "donor.location.pincode": 1,
          foodItems: 1,
          images: 1,
          status: 1,
          pickupAddress: 1,
          pickupTimePreference: 1,
          requestedCarehomes: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    reply.send(successResponse(requestedDonations));
  } catch (err) {
    console.log(err);
    reply
      .code(500)
      .send(errorResponse("Failed to fetch requested donations", err));
  }
};

export async function getAvailableDonations(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const carehomeId = request.user.id;
    const carehome = await CareHome.findById(carehomeId).lean();

    if (!carehome || !carehome.locationGeo) {
      return reply
        .code(404)
        .send(errorResponse("Carehome not found or missing location data."));
    }

    const [lng, lat] = carehome.locationGeo.coordinates;
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
        $addFields: {
          isAlreadyRequested: {
            $anyElementTrue: {
              $map: {
                input: { $ifNull: ["$requestedCarehomes", []] },
                as: "carehome",
                in: {
                  $eq: [
                    "$$carehome.carehomeId",
                    new Types.ObjectId(carehomeId),
                  ],
                },
              },
            },
          },
        },
      },
      {
        $match: {
          status: { $in: ["pending", "accepted", "picked_up"] },
          // isExpired: false,
          isAlreadyRequested: false,
        },
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
        $lookup: {
          from: "users",
          localField: "ngo",
          foreignField: "_id",
          as: "ngoInfo",
        },
      },
      {
        $unwind: { path: "$ngoInfo", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          foodItems: 1,
          pickupAddress: 1,
          status: 1,
          distance: 1,
          donationCoordinates: "$locationGeo.coordinates",
          "donorInfo.name": 1,
          "donorInfo.email": 1,
          "donorInfo.phone": 1,
          ngoInfo: {
            $cond: {
              if: { $eq: ["$status", "accepted"] },
              then: {
                name: "$ngoInfo.name",
                email: "$ngoInfo.email",
                phone: "$ngoInfo.phone",
              },
              else: null,
            },
          },
        },
      },
      {
        $limit: 10,
      },
    ]);

    return reply.code(200).send(successResponse(donations));
  } catch (err) {
    console.error(err);
    return reply.code(500).send(errorResponse("Internal Server Error", err));
  }
}

export const getOngoingDeliveries = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const carehomeId = request.user.id;

    const ongoingDeliveries = await Donation.find({
      assignedCareHome: new Types.ObjectId(carehomeId),
    }).lean();

    reply.send(successResponse(ongoingDeliveries));
  } catch (err) {
    reply
      .code(500)
      .send(errorResponse("Failed to fetch ongoing deliveries", err));
  }
};

export const getPersonalDetails = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const carehomeId = request.user.id;

    const carehome = await CareHomeModel.findById(carehomeId, {
      _id: 1,
      name: 1,
      email: 1,
      phone: 1,
    });

    reply.send(
      successResponse(carehome, "Successfully fetched personal details"),
    );
  } catch (err) {
    reply
      .code(500)
      .send(errorResponse("Failed to fetch personal details", err));
  }
};

export const markDonationAsReceived = async (
  request: FastifyRequest<{ Params: { donationId: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { donationId } = request.params;
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return reply.code(404).send(errorResponse("Donation not found"));
    }
    donation.carehomeConfirmedDelivery = true;
    if (donation.ngoDelivered && donation.carehomeConfirmedDelivery) {
      donation.status = "delivered";
    }
    donation.save();
    reply.send(
      successResponse(donation, "Donation marked as delivered successfully"),
    );
  } catch (err) {
    reply.code(500).send(errorResponse("Internal server error", err));
  }
};
