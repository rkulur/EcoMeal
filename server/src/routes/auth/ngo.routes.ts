import { FastifyInstance } from "fastify";
import { registerNGO } from "../../controllers/auth";

const ngoSchema = {
  body: {
    type: "object",
    required: [
      "name",
      "email",
      "phone",
      "password",
      "confirmPassword",
      "location",
      "locationGeo",
      "preferredPickupTime",
      "foodTypesAccepted",
      "servingCapacity",
    ],
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      phone: { type: "string" },
      password: { type: "string", minLength: 6 },
      confirmPassword: { type: "string" },
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
      locationGeo: {
        type: "object",
        required: ["type", "coordinates"],
        properties: {
          type: { type: "string" },
          coordinates: { type: "array" },
        },
      },
      preferredPickupTime: { type: "string" },
      foodTypesAccepted: {
        type: "array",
        items: { type: "string" },
      },
      servingCapacity: { type: "number" },
      nextPickupTime: { type: "string" },
      profilePicture: { type: "string" },
    },
  },
};

export default async function NGOAuthRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/ngo",
    {
      schema: ngoSchema,
    },
    registerNGO,
  );
}
