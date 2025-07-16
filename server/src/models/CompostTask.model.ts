import mongoose, { InferSchemaType } from "mongoose";

const compostTaskSchema = new mongoose.Schema(
  {
    donation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },
    composter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["claimed", "composted", "failed"],
      default: "claimed",
    },
    compostedDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

export type CompostTaskType = InferSchemaType<typeof compostTaskSchema>;

export const CompostTask =
  mongoose.models.CompostTask ||
  mongoose.model("CompostTask", compostTaskSchema);
