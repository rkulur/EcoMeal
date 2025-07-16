import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

const foodRequestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Care Home
      required: true,
    },
    requestedItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, default: "kg" },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "delivered", "rejected", "cancelled"],
      default: "pending",
    },
    assignedNgo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // NGO
    },
    assignedDonation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation", // Donation
    },
    deliveryDate: { type: Date },
    comments: { type: String },
    isDeleted: { type: Boolean, default: false },
    rejectedDonations: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Donation" },
    ],
    rejectionHistory: [
      {
        donationId: { type: mongoose.Schema.Types.ObjectId, ref: "Donation" },
        reasonCode: {
          type: String,
          enum: ["already_sourced", "donation_unsuitable"],
        },
        note: String,
        rejectedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

export type FoodRequestType = InferSchemaType<typeof foodRequestSchema>;
export type FoodRequestDoc = HydratedDocument<FoodRequestType>;

export const FoodRequest =
  mongoose.models.FoodRequest ||
  mongoose.model("FoodRequest", foodRequestSchema);
