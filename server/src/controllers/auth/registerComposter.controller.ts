import { FastifyReply, FastifyRequest } from "fastify";
import Composter, { ComposterType } from "../../models/Composter.model";
import { errorResponse, successResponse } from "../../utils/responseWrapper";
import { generateToken } from "../../utils/generateToken";
import bcrypt from "bcryptjs";

export const registerComposter = async (
  request: FastifyRequest,
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
      acceptedFoodTypes,
      capacityKgPerDay,
    } = request.body as any;

    if (password !== confirmPassword) {
      return reply.code(400).send(errorResponse("Password doesn't match"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const composter = await Composter.create({
      name,
      role: "composter",
      email,
      phone,
      password: hashedPassword,
      location,
      acceptedFoodTypes,
      capacityKgPerDay,
    });

    const token = generateToken(request.server.jwt, composter);

    reply
      .code(201)
      .send(
        successResponse(
          {
            token,
            name: composter.name,
            email: composter.email,
            role: composter.role,
          },
          "Composter registered successfully",
        ),
      );
  } catch (err) {
    console.error("Inside catch" + err);
    reply.code(500).send(errorResponse("Registration failed", err));
  }
};
