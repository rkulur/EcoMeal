import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  password?: string;
  role: "donor" | "ngo" | "carehome" | "admin" | "composter";
  phone: string;
  location: {
    state: string;
    district: string;
    city: string;
    pincode: string;
  };
  profilePicture?: string;
  verificationDocument?: string;
  socialMedia?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  isVerified: boolean;
  isGoogleAuth: boolean;
  picture?: string;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return !this.isGoogleAuth;
      },
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["donor", "ngo", "carehome", "admin", "composter"],
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    location: {
      state: { type: String, required: true },
      district: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    profilePicture: String,
    verificationDocument: {
      type: String,
      required: false,
    },
    socialMedia: {
      website: String,
      facebook: String,
      instagram: String,
      twitter: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isGoogleAuth: {
      type: Boolean,
      default: false,
    },
    picture: String,
    googleId: String,
  },
  {
    timestamps: true,
    discriminatorKey: "role",
  },
);

export default mongoose.model<IUser>("User", userSchema);
