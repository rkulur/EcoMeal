import mongoose, { Document } from "mongoose";
import User, { IUser } from "./User.model";

export interface IDonor extends IUser {
  category: "individual" | "restaurant" | "hotel" | "catering" | "other";
  donationHistory: mongoose.Types.ObjectId[];
  rating: number;
  totalDonations: number;
}

const donorSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["individual", "restaurant", "hotel", "catering", "other"],
    required: true,
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
  totalDonations: {
    type: Number,
    default: 0,
  },
});

export default User.discriminator<IDonor>("donor", donorSchema);

