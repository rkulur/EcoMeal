import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    locationGeo: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    foodItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: {
          type: String,
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
    requestedCarehomes: [
      {
        carehomeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["requested", "approved", "rejected"],
          default: "requested",
        },
        requestedAt: { type: Date, default: Date.now },
      },
    ],
    pickupDate: { type: Date },
    deliveryDate: { type: Date },
    isExpired: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    ngoPickedUp: { type: Boolean, default: false },
    donorConfirmedPickup: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type DonationType = InferSchemaType<typeof donationSchema>;
export type DonationDoc = HydratedDocument<DonationType>;

export const Donation =
  mongoose.models.Donation || mongoose.model("Donation", donationSchema);
