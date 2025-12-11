import { DonationHistoryListType, FoodItem } from "../donor";

export type PersonalDetails = {
  _id: string;
  name: string;
  email: string;
  phone: string;
};

export type CarehomeDetails = {
  email: string;
  name: string;
  phone: string;
  location: {
    state: string;
    district: string;
    city: string;
    pincode: string;
  };
  locationGeo: {
    type: string;
    coordinates: number[];
  };
  profilePicture?: string;
  isVerified: boolean;
  isGoogleAuth: boolean;
  googleId?: string;
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
  requestedAt?: Date;
};
