import mongoose, { InferSchemaType } from "mongoose";

const impactStatsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    totalMeals: { type: Number, default: 0 },
    totalFoodKg: { type: Number, default: 0 },
    donationsMade: { type: Number, default: 0 }, // For Donor
    donationsHandled: { type: Number, default: 0 }, // For NGO
    donationsReceived: { type: Number, default: 0 }, // For CareHome
    compostedItems: { type: Number, default: 0 }, // For Composter
  },
  { timestamps: true },
);

export type ImpactStatsType = InferSchemaType<typeof impactStatsSchema>;

export const ImpactStats =
  mongoose.models.ImpactStats ||
  mongoose.model("ImpactStats", impactStatsSchema);
