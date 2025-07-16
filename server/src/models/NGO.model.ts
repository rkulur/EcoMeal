import mongoose from "mongoose";
import User, { IUser } from "./User.model";

export interface INGO extends IUser {
  preferredPickupTime: string;
  foodTypesAccepted: (
    | "vegetarian"
    | "non-vegetarian"
    | "vegan"
    | "gluten-free"
    | "other"
  )[];
  servingCapacity: number;
  nextPickupTime: string;
  donationHistory: mongoose.Types.ObjectId[];
  rating: number;
}

const ngoSchema = new mongoose.Schema({
  preferredPickupTime: {
    type: String,
    required: true,
  },
  foodTypesAccepted: [
    {
      type: String,
      enum: ["vegetarian", "non-vegetarian", "vegan", "gluten-free", "other"],
    },
  ],
  servingCapacity: {
    type: Number,
    required: true,
  },
  nextPickupTime: {
    type: String,
  },
  donationHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
});

export default User.discriminator<INGO>("ngo", ngoSchema);
