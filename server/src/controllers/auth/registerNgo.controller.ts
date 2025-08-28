import bcrypt from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import NGO from "../../models/NGO.model";
import { generateToken } from "../../utils/generateToken";
import { successResponse } from "../../utils/responseWrapper";

interface NGORegistrationBody {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  location: {
    state: string;
    district: string;
    city: string;
    pincode: string;
  };
  locationGeo: {
    type: string;
    coordinates: [number, number];
  };
  preferredPickupTime: string;
  foodTypesAccepted: string[];
  servingCapacity?: number;
  nextPickupTime?: string;
  profilePicture?: string;
  verificationDocument: string;
  socialMedia?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

type NGORegistrationRequest = FastifyRequest<{
  Body: NGORegistrationBody;
}>;

const registerNGO = async (
  request: NGORegistrationRequest,
  reply: FastifyReply,
) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
      location,
      locationGeo,
      preferredPickupTime,
      foodTypesAccepted,
      servingCapacity,
      profilePicture,
      verificationDocument,
      socialMedia,
    } = request.body;

    if (password !== confirmPassword) {
      return reply.code(400).send({ error: "Passwords do not match" });
    }

    const existingUser = await NGO.findOne({ email });
    if (existingUser) {
      return reply.code(400).send({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const ngo = await NGO.create({
      name,
      email,
      phone,
      password: hashedPassword,
      location,
      locationGeo,
      preferredPickupTime,
      foodTypesAccepted,
      servingCapacity,
      profilePicture,
      verificationDocument,
      socialMedia,
      role: "ngo",
    });

    const token = generateToken(request.server.jwt, ngo);

    const payload = {
      _id: ngo._id,
      name: ngo.name,
      email: ngo.email,
      role: ngo.role,
      token,
    };
    return reply
      .code(201)
      .send(successResponse(payload, "NGO registered successfully"));
  } catch (error) {
    return reply.code(500).send({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export { registerNGO };
