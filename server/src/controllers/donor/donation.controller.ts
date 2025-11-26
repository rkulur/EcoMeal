import { FastifyReply } from "fastify/types/reply";
import { errorResponse, successResponse } from "../../utils/responseWrapper";
import {
  Donation,
  DonationDoc,
  DonationType,
} from "../../models/Donation.model";
import { FastifyRequest } from "fastify";

export async function createDonation(
  request: FastifyRequest<{ Body: DonationType }>,
  reply: FastifyReply,
) {
  try {
    const donorId = request.user.id;
    const donation = {
      ...request.body,
      donor: donorId,
      isDeleted: false,
      requestedCarehomes: [],
    };
    const newDonation = await Donation.create(donation);
    return reply
      .code(201)
      .send(successResponse(newDonation, "Donation created successfully"));
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error", err));
  }
}

export async function getFullDonationHistory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const userId = request.user?.id;
    if (!userId) {
      return reply.code(500).send(errorResponse("Unauthorized"));
    }

    const history = await Donation.find({ donor: userId, isDeleted: false })
      .populate("acceptedBy", "name profilePicture")
      .sort({ createdAt: -1 });

    return reply
      .code(201)
      .send(successResponse(history, "Donation history fetched successfully"));
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error", err));
  }
}

export async function getPartialDonationHistory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const userId = request.user?.id;
    if (!userId) {
      return reply.code(500).send(errorResponse("Unauthorized"));
    }

    const history = await Donation.find(
      { donor: userId, isDeleted: false },
      { foodItems: 1, createdAt: 1, acceptedBy: 1, status: 1 },
    )
      .populate("acceptedBy", "name profilePicture location")
      .sort({ createdAt: -1 });

    return reply
      .code(201)
      .send(successResponse(history, "Donation history fetched successfully"));
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error", err));
  }
}

export async function getDonationById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    const donation = (await Donation.findOne({ _id: id, isDeleted: false })
      .populate("donor", "name email")
      .populate("acceptedBy", "name email location")) as DonationDoc;

    if (!donation) {
      return reply.code(404).send(errorResponse("Donation not found"));
    }
    return reply
      .code(200)
      .send(successResponse(donation, "Donation retrieved successfully"));
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error", err));
  }
}

export async function getDonationStatusById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  try {
    const { id } = request.params;
    const donation = (await Donation.findOne({ _id: id, isDeleted: false })
      .populate("donor", "name email")
      .populate("acceptedBy", "name email")) as DonationDoc;

    if (!donation) {
      return reply.code(404).send(errorResponse("Donation not found"));
    }
    return reply
      .code(200)
      .send(
        successResponse(donation, "Donation status retrieved successfully"),
      );
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error", err));
  }
}

export async function updateDonation(
  request: FastifyRequest<{
    Body: DonationType;
    Params: { id: string };
  }>,
  reply: FastifyReply,
) {
  const { id } = request.params;
  const donorId = request.user.id;
  try {
    const donation = (await Donation.findOne({
      _id: id,
      donor: donorId,
      isDeleted: false,
    })) as DonationDoc;
    if (!donation) {
      return reply.code(404).send(errorResponse("Donation not found"));
    }

    if (donation.status !== "pending") {
      return reply
        .code(400)
        .send(errorResponse("Donation cannot be edited after it's claimed"));
    }

    Object.assign(donation, request.body);
    await donation.save();
    return reply.code(200).send(successResponse(donation, "Donation updated"));
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error", err));
  }
}

export async function deleteDonation(
  request: FastifyRequest<{
    Params: { id: string };
    Body: { isDeleted: boolean };
  }>,
  reply: FastifyReply,
) {
  const { id } = request.params;
  const donorId = request.user?.id;
  const { isDeleted } = request.body;

  try {
    const donation = (await Donation.findOne({
      _id: id,
      donor: donorId,
    })) as DonationDoc;
    if (!donation) {
      return reply.code(404).send(errorResponse("Donation not found"));
    }

    if (donation.status !== "pending") {
      return reply
        .code(400)
        .send(
          errorResponse("Cannot delete donation after it has been accepted"),
        );
    }

    donation.isDeleted = isDeleted;
    await donation.save();

    return reply
      .code(200)
      .send(successResponse(null, "Donation deleted successfully"));
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error", err));
  }
}

export async function getDonorImpact(
  request: FastifyRequest,
  reply: FastifyReply,
) {}

export async function confirmNGOPickup(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply,
) {
  const { id } = request.params;
  const donorId = request.user.id;
  try {
    const donation = (await Donation.findOne({
      _id: id,
      donor: donorId,
      isDeleted: false,
    })) as DonationDoc;
    if (!donation) {
      return reply.code(404).send(errorResponse("Donation not found"));
    }

    if (donation.ngoPickedUp) {
      donation.status = "picked_up";
    }
    donation.donorConfirmedPickup = true;
    await donation.save();
    return reply
      .code(200)
      .send(successResponse(donation, "Donation pickup confirmed!"));
  } catch (err) {
    return reply.code(500).send(errorResponse("Internal Server Error", err));
  }
}
