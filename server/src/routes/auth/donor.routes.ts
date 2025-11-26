import { FastifyInstance, RouteHandlerMethod } from "fastify";
import { registerDonor } from "../../controllers/auth";

const donorSchema = {
  body: {
    type: "object",
    required: [
      "name",
      "email",
      "phone",
      "password",
      "confirmPassword",
      "location",
    ],
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      phone: { type: "string" },
      password: { type: "string", minLength: 6 },
      confirmPassword: { type: "string", minLength: 6 },
      location: {
        type: "object",
        required: ["state", "district", "city", "pincode"],
        properties: {
          state: { type: "string" },
          district: { type: "string" },
          city: { type: "string" },
          pincode: { type: "string" },
        },
      },
      profilePicture: { type: "string" },
    },
  },
};

export default async function donorAuthRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/donor",
    {
      schema: donorSchema,
    },
    registerDonor as RouteHandlerMethod,
  );
}
