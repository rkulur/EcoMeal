import User from "./User.model";
import { InferSchemaType, Schema } from "mongoose";

const composterSchema = new Schema({
  organizationName: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  capacityKgPerDay: { type: Number },
  currentLoadKg: { type: Number, default: 0 },
  acceptedFoodTypes: [{ type: String }], // e.g. ['vegetables', 'grains']
});

export type ComposterType = InferSchemaType<typeof composterSchema>;
export default User.discriminator<ComposterType>("composter", composterSchema);
