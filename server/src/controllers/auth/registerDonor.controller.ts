import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcryptjs";
import Donor from "../../models/Donor.model";
import { successResponse, errorResponse } from "../../utils/responseWrapper";
import { generateToken } from "../../utils/generateToken";

interface DonorRegistrationRequest extends FastifyRequest {
  body: {
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
    profilePicture?: string;
  };
  jwt: {
    sign: (payload: { id: unknown }) => string;
  };
}

const registerDonor = async (
  request: DonorRegistrationRequest,
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
      profilePicture,
    } = request.body;

    // Validation
    if (password !== confirmPassword) {
      return reply.code(400).send(errorResponse("Passwords do not match"));
    }

    const existingUser = await Donor.findOne({ email });
    if (existingUser) {
      return reply.code(400).send(errorResponse("Email already registered"));
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create donor (discriminator of User model)
    const donor = await Donor.create({
      name,
      email,
      password: hashedPassword,
      phone,
      location,
      profilePicture,
      role: "donor",
    });

    // Generate token
    const token = generateToken(request.server.jwt, donor);

    // Send response
    const payload = {
      _id: donor._id,
      name: donor.name,
      email: donor.email,
      role: donor.role,
      token,
    };

    return reply
      .code(201)
      .send(successResponse(payload, "Donor registered successfully"));
  } catch (error) {
    return reply
      .code(500)
      .send(
        errorResponse(
          error instanceof Error ? error.message : "Registration failed",
        ),
      );
  }
};

export { registerDonor };
