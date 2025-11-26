import { FastifyInstance, RouteHandlerMethod } from "fastify";
import { registerCareHome } from "../../controllers/auth";

const careHomeSchema = {
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
      "pointOfContact",
      "noOfResidents",
      "preferredDeliveryTime",
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
      locationGeo: {
        type: "object",
        required: ["type", "coordinates"],
        properties: {
          type: { type: "string" },
          coordinates: { type: "array" },
        },
      },
      pointOfContact: { type: "string" },
      noOfResidents: { type: "number" },
      dietaryRestrictions: {
        type: "array",
        items: { type: "string" },
      },
      preferredDeliveryTime: { type: "string" },
      profilePicture: { type: "string" },
    },
  },
};

export default async function careHomeAuthRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/carehome",
    {
      schema: careHomeSchema,
    },
    registerCareHome as RouteHandlerMethod,
  );
}
