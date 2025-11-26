import User, { IUser } from "./User.model";
import mongoose, { InferSchemaType, Schema } from "mongoose";

export interface IComposter extends IUser {
  capacityKgPerDay: number;
  acceptedFoodTypes: string[];
}

const composterSchema = new Schema({
  capacityKgPerDay: { type: Number },
  acceptedFoodTypes: [{ type: String }],
});

export type ComposterType = InferSchemaType<typeof composterSchema>;
export default User.discriminator<IComposter>("composter", composterSchema);
export const Composter =
  mongoose.models.Donation || mongoose.model("Composter", composterSchema);
