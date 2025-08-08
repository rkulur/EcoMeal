import { FastifyInstance, RouteHandler } from "fastify/fastify";
import {
  createDonation,
  deleteDonation,
  getFullDonationHistory,
  getDonationStatusById,
  updateDonation,
  getDonationById,
  getPartialDonationHistory,
} from "../../controllers/donor";

export const createDonationSchema = {
  body: {
    type: "object",
    required: ["foodItems", "pickupAddress"],
    properties: {
      foodItems: {
        type: "array",
        items: {
          type: "object",
          required: ["name", "quantity"],
          properties: {
            name: { type: "string" },
            quantity: { type: "number" },
            unit: {
              type: "string",
              enum: [
                "plates",
                "servings",
                "packets",
                "containers",
                "trays",
                "bowls",
                "boxes",
                "liters",
                "ml",
              ],
              default: "plates",
            },
            expiryDate: { type: "string", format: "date-time" },
          },
        },
      },
      pickupAddress: {
        type: "object",
        required: ["address"],
        properties: {
          address: { type: "string" },
          landmark: { type: "string" },
          coordinates: {
            type: "object",
            properties: {
              lat: { type: "number" },
              lng: { type: "number" },
            },
          },
        },
      },
      pickupTimePreference: {
        type: "string",
        format: "date-time",
      },
      images: {
        type: "array",
        items: {
          type: "object",
          required: ["url"],
          properties: {
            url: { type: "string", format: "uri" },
            uploadedAt: { type: "string", format: "date-time" }, // optional, auto-settable
          },
        },
      },
      isDeleted: {
        type: "boolean",
      },
    },
  },
};
export default async function donationRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/",
    {
      schema: createDonationSchema,
      preHandler: [fastify.authenticate, fastify.isDonor],
    },
    createDonation as RouteHandler,
  );

  fastify.get(
    "/history",
    { preHandler: [fastify.authenticate, fastify.isDonor] },
    getPartialDonationHistory,
  );

  fastify.get(
    "/:id",
    {
      preHandler: [fastify.authenticate, fastify.isDonor],
    },
    getDonationById as RouteHandler,
  );

  fastify.patch(
    "/update/:id",
    {
      preHandler: [fastify.authenticate, fastify.isDonor],
    },
    updateDonation as RouteHandler,
  );

  fastify.patch(
    "/delete/:id",
    {
      preHandler: [fastify.authenticate, fastify.isDonor],
    },
    deleteDonation as RouteHandler,
  );
}
