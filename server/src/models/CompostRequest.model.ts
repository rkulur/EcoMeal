import mongoose from "mongoose";

const compostRequestSchema = new mongoose.Schema(
  {
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation", // Link to the expired donation
      required: true,
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin or NGO triggering the compost
      required: true,
    },
    composter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Composter
    },
    foodDetails: [
      {
        name: String,
        quantity: Number,
        unit: { type: String, default: "kg" },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "accepted", "picked_up", "completed", "rejected"],
      default: "pending",
    },
    pickupDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true },
);

export const CompostRequest =
  mongoose.models.CompostRequest ||
  mongoose.model("CompostRequest", compostRequestSchema);
