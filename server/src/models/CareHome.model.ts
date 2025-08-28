import mongoose from "mongoose";
import User, { IUser } from "./User.model";

export interface ICareHome extends IUser {
  pointOfContact: string;
  preferredPickupTime: string;
  noOfResidents: number;
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
  locationGeo: {
    type: string;
    coordinates: [number, number];
  };
}

const careHomeSchema = new mongoose.Schema({
  pointOfContact: {
    type: String,
    required: true,
  },
  noOfResidents: {
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
  requestHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
});

export default User.discriminator<ICareHome>("carehome", careHomeSchema);
