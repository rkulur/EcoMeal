import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foodItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, default: "kg" },
        expiryDate: { type: Date },
      },
    ],
    pickupAddress: {
      address: { type: String, required: true },
      landmark: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    pickupTimePreference: {
      type: Date,
    },
    images: [
      {
        url: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "assigned",
        "picked_up",
        "delivered",
        "expired",
        "cancelled",
      ],
      default: "pending",
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // NGO
    },
    assignedCareHome: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Care Home
    },
    assignedRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodRequest",
    },
    pickupDate: { type: Date },
    deliveryDate: { type: Date },
    isExpired: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type DonationType = InferSchemaType<typeof donationSchema>;
export type DonationDoc = HydratedDocument<DonationType>;

export const Donation =
  mongoose.models.Donation || mongoose.model("Donation", donationSchema);
