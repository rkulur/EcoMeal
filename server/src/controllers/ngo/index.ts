import { FastifyReply, FastifyRequest } from "fastify/fastify";
import { Types } from "mongoose";
import CareHomeModel from "../../models/CareHome.model";
import { Donation, DonationDoc } from "../../models/Donation.model";
import NGOModel from "../../models/NGO.model";
import { errorResponse, successResponse } from "../../utils/responseWrapper";

type Status =
  | "pending"
  | "accepted"
  | "assigned"
  | "picked_up"
  | "delivered"
  | "expired"
  | "cancelled";

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

export async function getPendingDonations(
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
        $match: {
          status: "accepted",
          acceptedBy: new Types.ObjectId(ngoId),
          ngoPickedUp: false,
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

      { $unwind: "$donorInfo" },
      {
        $lookup: {
          from: "users",
          localField: "requestedCarehomes.carehomeId",
          foreignField: "_id",
          as: "carehomeDetails",
        },
      },

      // Combine each requestedCarehome with its user details
      {
        $addFields: {
          requestedCarehomes: {
            $map: {
              input: "$requestedCarehomes",
              as: "req",
              in: {
                $mergeObjects: [
                  "$$req",
                  {
                    $let: {
                      vars: {
                        carehome: {
                          $arrayElemAt: [
                            {
                              $filter: {
                                input: "$carehomeDetails",
                                as: "ch",
                                cond: { $eq: ["$$ch._id", "$$req.carehomeId"] },
                              },
                            },
                            0,
                          ],
                        },
                      },
                      in: {
                        name: "$$carehome.name",
                        email: "$$carehome.email",
                        phone: "$$carehome.phone",
                      },
                    },
                  },
                ],
              },
            },
          },
        },
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
          pickupTimePreference: 1,
          requestedCarehomes: {
            carehomeId: 1,
            status: 1,
            requestedAt: 1,
            name: 1,
            email: 1,
            phone: 1,
          },
        },
      },
    ]);

    return reply.code(200).send(successResponse(donations));
  } catch (err) {
    console.error(err);
    return reply.code(500).send(errorResponse("Internal Server Error", err));
  }
}

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
      // Get donor info
      {
        $lookup: {
          from: "users",
          localField: "donor",
          foreignField: "_id",
          as: "donorInfo",
        },
      },
      { $unwind: "$donorInfo" },

      // Get all carehome user details in requestedCarehomes
      {
        $lookup: {
          from: "users",
          localField: "requestedCarehomes.carehomeId",
          foreignField: "_id",
          as: "carehomeDetails",
        },
      },

      // Combine each requestedCarehome with its user details
      {
        $addFields: {
          requestedCarehomes: {
            $map: {
              input: "$requestedCarehomes",
              as: "req",
              in: {
                $mergeObjects: [
                  "$$req",
                  {
                    $let: {
                      vars: {
                        carehome: {
                          $arrayElemAt: [
                            {
                              $filter: {
                                input: "$carehomeDetails",
                                as: "ch",
                                cond: { $eq: ["$$ch._id", "$$req.carehomeId"] },
                              },
                            },
                            0,
                          ],
                        },
                      },
                      in: {
                        name: "$$carehome.name",
                        email: "$$carehome.email",
                        phone: "$$carehome.phone",
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },

      // Cleanup fields
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
          requestedCarehomes: {
            carehomeId: 1,
            status: 1,
            requestedAt: 1,
            name: 1,
            email: 1,
            phone: 1,
          },
        },
      },
      { $limit: 10 },
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
  const ngoId = request.user.id;

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
    Body: { carehomeId: string };
  }>,
  reply: FastifyReply,
) {
  const { carehomeId } = request.body;
  const { donationId } = request.params;

  try {
    const donation = (await Donation.findOne({
      _id: donationId,
      isDeleted: false,
    })) as DonationDoc;

    if (!donation) {
      return reply.code(404).send(errorResponse("Donation not found"));
    }

    donation.assignedCareHome = new Types.ObjectId(carehomeId.toString());
    donation.requestedCarehomes.forEach((carehome) => {
      if (carehome?.carehomeId!.toString() === carehomeId) {
        carehome.status = "approved";
      } else {
        carehome.status = "rejected";
      }
    });
    donation.status = "assigned";
    await donation.save();

    return reply
      .code(200)
      .send(
        successResponse(donation, "Donation assigned to CareHome successfully"),
      );
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

export async function setDonationExpiry(
  request: FastifyRequest<{
    Params: { donationId: string };
    Body: { status: string };
  }>,
  reply: FastifyReply,
) {
  try {
    const { donationId } = request.params;

    const donation = (await Donation.findById(donationId)) as DonationDoc;
    if (!donation) {
      return reply.code(403).send(errorResponse("Donation not found"));
    }
    donation.status = "expired";
    await donation.save();
    return reply.code(200).send(successResponse(donation, "Status updated"));
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error"));
  }
}

export async function markAsPickedUp(
  request: FastifyRequest<{
    Params: { donationId: string };
  }>,
  reply: FastifyReply,
) {
  try {
    const { donationId } = request.params;

    const donation = (await Donation.findById(donationId)) as DonationDoc;
    if (!donation) {
      return reply.code(403).send(errorResponse("Donation not found"));
    }

    if (donation.donorConfirmedPickup) {
      donation.status = "picked_up";
    }
    donation.ngoPickedUp = true;
    await donation.save();
    return reply
      .code(200)
      .send(successResponse(donation, "Donation marked as picked up!"));
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error"));
  }
}

export async function getPickedUpDonations(
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
    const pickedUpDonations = await Donation.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lng, lat] },
          distanceField: "distance",
          spherical: true,
          maxDistance: 15000,
        },
      },
      {
        $match: {
          status: "picked_up",
          acceptedBy: new Types.ObjectId(ngoId),
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

      { $unwind: "$donorInfo" },
      {
        $lookup: {
          from: "users",
          localField: "requestedCarehomes.carehomeId",
          foreignField: "_id",
          as: "carehomeDetails",
        },
      },

      // Combine each requestedCarehome with its user details
      {
        $addFields: {
          requestedCarehomes: {
            $map: {
              input: "$requestedCarehomes",
              as: "req",
              in: {
                $mergeObjects: [
                  "$$req",
                  {
                    $let: {
                      vars: {
                        carehome: {
                          $arrayElemAt: [
                            {
                              $filter: {
                                input: "$carehomeDetails",
                                as: "ch",
                                cond: { $eq: ["$$ch._id", "$$req.carehomeId"] },
                              },
                            },
                            0,
                          ],
                        },
                      },
                      in: {
                        name: "$$carehome.name",
                        email: "$$carehome.email",
                        phone: "$$carehome.phone",
                      },
                    },
                  },
                ],
              },
            },
          },
        },
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
          pickupTimePreference: 1,
          requestedCarehomes: {
            carehomeId: 1,
            status: 1,
            requestedAt: 1,
            name: 1,
            email: 1,
            phone: 1,
          },
        },
      },
    ]);

    return reply.code(200).send(successResponse(pickedUpDonations));
  } catch (err) {
    console.error(err);
    return reply.code(500).send(errorResponse("Internal Sheesh Error", err));
  }
}

export async function getOngoingDonations(
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
    const ongoingDonations = await Donation.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lng, lat] },
          distanceField: "distance",
          spherical: true,
          maxDistance: 15000,
        },
      },
      {
        $match: {
          status: {
            $in: ["accepted", "assigned", "picked_up"],
          },
          acceptedBy: new Types.ObjectId(ngoId),
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

      { $unwind: "$donorInfo" },
      {
        $lookup: {
          from: "users",
          localField: "requestedCarehomes.carehomeId",
          foreignField: "_id",
          as: "carehomeDetails",
        },
      },

      // Combine each requestedCarehome with its user details
      {
        $addFields: {
          requestedCarehomes: {
            $map: {
              input: "$requestedCarehomes",
              as: "req",
              in: {
                $mergeObjects: [
                  "$$req",
                  {
                    $let: {
                      vars: {
                        carehome: {
                          $arrayElemAt: [
                            {
                              $filter: {
                                input: "$carehomeDetails",
                                as: "ch",
                                cond: { $eq: ["$$ch._id", "$$req.carehomeId"] },
                              },
                            },
                            0,
                          ],
                        },
                      },
                      in: {
                        name: "$$carehome.name",
                        email: "$$carehome.email",
                        phone: "$$carehome.phone",
                      },
                    },
                  },
                ],
              },
            },
          },
        },
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
          pickupTimePreference: 1,
          requestedCarehomes: {
            carehomeId: 1,
            status: 1,
            requestedAt: 1,
            name: 1,
            email: 1,
            phone: 1,
          },
          ngoPickedUp: 1,
          donorConfirmedPickup: 1,
          ngoDelivered: 1,
          carehomeConfirmedDelivery: 1,
        },
      },
    ]);

    return reply.code(200).send(successResponse(ongoingDonations));
  } catch (err) {
    console.error(err);
    return reply.code(500).send(errorResponse("Internal Sheesh Error", err));
  }
}

export const getCarehomeDetailsById = async (
  request: FastifyRequest<{ Params: { carehomeId: string } }>,
  reply: FastifyReply,
) => {
  try {
    const { carehomeId } = request.params;

    const carehome = await CareHomeModel.findById(carehomeId).lean();
    if (!carehome) {
      return reply.code(403).send(errorResponse("Carehome not found"));
    }

    return reply
      .code(200)
      .send(
        successResponse(carehome, "Carehome details fetched successfully!"),
      );
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error"));
  }
};

export async function getAssignedDonations(
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
    const ongoingDonations = await Donation.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lng, lat] },
          distanceField: "distance",
          spherical: true,
          maxDistance: 15000,
        },
      },
      {
        $match: {
          status: {
            $in: ["assigned"],
          },
          acceptedBy: new Types.ObjectId(ngoId),
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

      { $unwind: "$donorInfo" },
      {
        $lookup: {
          from: "users",
          localField: "requestedCarehomes.carehomeId",
          foreignField: "_id",
          as: "carehomeDetails",
        },
      },

      // Combine each requestedCarehome with its user details
      {
        $addFields: {
          requestedCarehomes: {
            $map: {
              input: "$requestedCarehomes",
              as: "req",
              in: {
                $mergeObjects: [
                  "$$req",
                  {
                    $let: {
                      vars: {
                        carehome: {
                          $arrayElemAt: [
                            {
                              $filter: {
                                input: "$carehomeDetails",
                                as: "ch",
                                cond: { $eq: ["$$ch._id", "$$req.carehomeId"] },
                              },
                            },
                            0,
                          ],
                        },
                      },
                      in: {
                        name: "$$carehome.name",
                        email: "$$carehome.email",
                        phone: "$$carehome.phone",
                      },
                    },
                  },
                ],
              },
            },
          },
        },
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
          pickupTimePreference: 1,
          requestedCarehomes: {
            carehomeId: 1,
            status: 1,
            requestedAt: 1,
            name: 1,
            email: 1,
            phone: 1,
          },
          ngoPickedUp: 1,
          donorConfirmedPickup: 1,
          ngoDelivered: 1,
          carehomeConfirmedDelivery: 1,
        },
      },
    ]);

    return reply.code(200).send(successResponse(ongoingDonations));
  } catch (err) {
    console.error(err);
    return reply.code(500).send(errorResponse("Internal Sheesh Error", err));
  }
}

export async function markDonationAsDelivered(
  request: FastifyRequest<{
    Params: { donationId: string };
  }>,
  reply: FastifyReply,
) {
  const { donationId } = request.params;

  try {
    const donation = (await Donation.findOne({
      _id: donationId,
      isDeleted: false,
    })) as DonationDoc;

    if (!donation) {
      return reply.code(404).send(errorResponse("Donation not found"));
    }

    donation.ngoDelivered = true;
    donation.save();

    return reply
      .code(200)
      .send(
        successResponse(donation, "Donation marked as delivered successfully"),
      );
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error"));
  }
}

export async function getPastDonations(
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
    const ongoingDonations = await Donation.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lng, lat] },
          distanceField: "distance",
          spherical: true,
          maxDistance: 15000,
        },
      },
      {
        $match: {
          status: {
            $in: ["delivered", "cancelled"],
          },
          acceptedBy: new Types.ObjectId(ngoId),
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

      { $unwind: "$donorInfo" },
      {
        $lookup: {
          from: "users",
          localField: "requestedCarehomes.carehomeId",
          foreignField: "_id",
          as: "carehomeDetails",
        },
      },

      // Combine each requestedCarehome with its user details
      {
        $addFields: {
          requestedCarehomes: {
            $map: {
              input: "$requestedCarehomes",
              as: "req",
              in: {
                $mergeObjects: [
                  "$$req",
                  {
                    $let: {
                      vars: {
                        carehome: {
                          $arrayElemAt: [
                            {
                              $filter: {
                                input: "$carehomeDetails",
                                as: "ch",
                                cond: { $eq: ["$$ch._id", "$$req.carehomeId"] },
                              },
                            },
                            0,
                          ],
                        },
                      },
                      in: {
                        name: "$$carehome.name",
                        email: "$$carehome.email",
                        phone: "$$carehome.phone",
                      },
                    },
                  },
                ],
              },
            },
          },
        },
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
          pickupTimePreference: 1,
          requestedCarehomes: {
            carehomeId: 1,
            status: 1,
            requestedAt: 1,
            name: 1,
            email: 1,
            phone: 1,
          },
          ngoPickedUp: 1,
          donorConfirmedPickup: 1,
          ngoDelivered: 1,
          carehomeConfirmedDelivery: 1,
        },
      },
    ]);

    return reply.code(200).send(successResponse(ongoingDonations));
  } catch (err) {
    console.error(err);
    return reply.code(500).send(errorResponse("Internal Sheesh Error", err));
  }
}
