import { Schema, model, Types } from "mongoose";

export interface IPickup {
  requestRef: Types.ObjectId;
  type: "Donation" | "Compost";
  pickedBy: Types.ObjectId;
  status: "Scheduled" | "In Transit" | "Completed";
  scheduledAt: Date;
  completedAt?: Date;
  notes?: string;
}

const pickupSchema = new Schema<IPickup>(
  {
    requestRef: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, enum: ["Donation", "Compost"], required: true },
    pickedBy: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    status: {
      type: String,
      enum: ["Scheduled", "In Transit", "Completed"],
      default: "Scheduled",
    },
    scheduledAt: { type: Date, required: true },
    completedAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true },
);

export const PickupModel = model<IPickup>("Pickup", pickupSchema);
