import { FastifyInstance, RouteHandlerMethod } from "fastify";
import { registerDonor } from "../../controllers/auth";

const donorSchema = {
  body: {
    type: "object",
    required: [
      "category",
      "name",
      "email",
      "phone",
      "password",
      "confirmPassword",
      "location",
      "verificationDocument",
    ],
    properties: {
      category: {
        type: "string",
        enum: ["individual", "restaurant", "hotel", "catering", "other"],
      },
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
      verificationDocument: { type: "string" },
      socialMedia: {
        type: "object",
        properties: {
          website: { type: "string" },
          facebook: { type: "string" },
          instagram: { type: "string" },
          twitter: { type: "string" },
        },
      },
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
