import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcryptjs";
import CareHome from "../../models/CareHome.model";
import { generateToken } from "../../utils/generateToken";

interface CareHomeRegistrationBody {
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
  pointOfContact: string;
  preferredPickupTime: string;
  noOfResidents: number;
  foodTypeRequired: string[];
  dietaryRestrictions?: string[];
  preferredDeliveryTime: string;
  profilePicture?: string;
  verificationDocument: string;
  socialMedia?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

type CareHomeRegistrationRequest = FastifyRequest<{
  Body: CareHomeRegistrationBody;
}>;

export const registerCareHome = async (
  request: CareHomeRegistrationRequest,
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
      pointOfContact,
      preferredPickupTime,
      noOfResidents,
      foodTypeRequired,
      dietaryRestrictions,
      preferredDeliveryTime,
      profilePicture,
      verificationDocument,
      socialMedia,
    } = request.body;

    if (password !== confirmPassword) {
      return reply.code(400).send({ error: "Passwords do not match" });
    }

    const existingUser = await CareHome.findOne({ email });
    if (existingUser) {
      return reply.code(400).send({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const careHome = await CareHome.create({
      name,
      email,
      phone,
      password: hashedPassword,
      location,
      pointOfContact,
      preferredPickupTime,
      noOfResidents: noOfResidents,
      foodTypeRequired,
      dietaryRestrictions,
      preferredDeliveryTime,
      profilePicture,
      verificationDocument,
      socialMedia,
      role: "carehome",
    });

    const token = generateToken(request.server.jwt, careHome);

    return reply.code(201).send({
      _id: careHome._id,
      name: careHome.name,
      email: careHome.email,
      role: careHome.role,
      token,
    });
  } catch (error) {
    return reply.code(500).send({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
};
