import mongoose, { Document } from "mongoose";
import User, { IUser } from "./User.model";

export interface IDonor extends IUser {
  donationHistory: mongoose.Types.ObjectId[];
  rating: number;
  totalDonations: number;
}

const donorSchema = new mongoose.Schema({
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
