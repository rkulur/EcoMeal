import mongoose from "mongoose";
import User, { IUser } from "./User.model";

export interface ICareHome extends IUser {
  pointOfContact: string;
  preferredPickupTime: string;
  numberOfResidents: number;
  foodTypeRequired: (
    | "vegetarian"
    | "non-vegetarian"
    | "vegan"
    | "halal"
    | "other"
  )[];
  dietaryRestrictions?: string[];
  preferredDeliveryTime: string;
  requestHistory: mongoose.Types.ObjectId[];
}

const careHomeSchema = new mongoose.Schema({
  pointOfContact: {
    type: String,
    required: true,
  },
  preferredPickupTime: {
    type: String,
    required: true,
  },
  numberOfResidents: {
    type: Number,
    required: true,
  },
  foodTypeRequired: [
    {
      type: String,
      enum: ["vegetarian", "non-vegetarian", "vegan", "halal", "other"],
    },
  ],
  dietaryRestrictions: [
    {
      type: String,
    },
  ],
  preferredDeliveryTime: {
    type: String,
    required: true,
  },
  requestHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
});

export default User.discriminator<ICareHome>("carehome", careHomeSchema);

