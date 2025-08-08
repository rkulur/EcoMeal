import { FastifyInstance, RouteHandlerMethod } from "fastify";
import { registerComposter } from "../../controllers/auth";

const composterSchema = {
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
      acceptedFoodTypes: {
        type: "array",
        items: { type: "string" },
      },
      capacityKgPerDay: { type: "number" },
    },
  },
};

export default async function composterAuthRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/composter",
    { schema: composterSchema },
    registerComposter as RouteHandlerMethod,
  );
}
