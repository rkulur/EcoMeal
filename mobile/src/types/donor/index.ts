export type FoodItem = {
  name: string;
  quantity: number;
  unit:
    | "plates"
    | "servings"
    | "packets"
    | "containers"
    | "trays"
    | "bowls"
    | "boxes"
    | "liters"
    | "ml";
  expiryDate?: Date;
};

export type DonationType = {
  _id: string;
  donor: string;

  foodItems: FoodItem[];

  pickupAddress: {
    address: string;
    landmark?: string;
    coordinates: {
      lat?: number;
      lng?: number;
    };
  };

  locationGeo: {
    type: string;
    coordinates: {
      longitude: number;
    };
  };

  pickupTimePreference?: Date;

  images: {
    url: string;
    uploadedAt?: Date;
  }[];

  status:
    | "pending"
    | "accepted"
    | "assigned"
    | "picked_up"
    | "delivered"
    | "expired"
    | "cancelled";

  acceptedBy?: {
    name: string;
    profilePicture: string;
    location: {
      state: string;
      district: string;
      city: string;
      pincode: string;
    };
  };
  assignedCareHome?: string;
  assignedRequest?: string;

  pickupDate?: Date;
  deliveryDate?: Date;
  isExpired?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  ngoPickedUp: boolean;
};

export type CreateDonationInput = {
  images: {
    url: string;
    uploadedAt?: Date;
  }[];
  pickupAddress: {
    address: string;
    landmark?: string;
  };
  locationGeo: {
    coordinates: number[];
    type?: string;
  };
  pickupTimePreference?: Date;
  foodItems: FoodItem[];
};

export type DonationHistoryListType = {
  _id: string;

  foodItems: {
    name: string;
    quantity: number;
    unit:
      | "plates"
      | "servings"
      | "packets"
      | "containers"
      | "trays"
      | "bowls"
      | "boxes"
      | "liters"
      | "ml";
    expiryDate?: Date;
  }[];
  acceptedBy?: {
    name: string;
    profilePicture: string;
  };
  createdAt?: Date;
  status:
    | "pending"
    | "accepted"
    | "assigned"
    | "picked_up"
    | "delivered"
    | "expired"
    | "cancelled";
  ngoPickedUp: boolean;
};
export interface AvailableDonation {
  _id: string;
  foodItems: {
    name: string;
    quantity: number;
    unit:
      | "plates"
      | "servings"
      | "packets"
      | "containers"
      | "trays"
      | "bowls"
      | "boxes"
      | "liters"
      | "ml";
    expiryDate?: string;
  }[];
  pickupAddress: {
    address: string;
    landmark: string;
  };
  status:
    | "pending"
    | "accepted"
    | "assigned"
    | "picked_up"
    | "delivered"
    | "expired"
    | "cancelled"
    | "available"
    | undefined;
  distance: number;
  donorInfo: {
    name: string;
    email: string;
    phone: string;
  };
  donationCoordinates: [number, number];
  requestedCarehomes?: RequestedCarehome[];
  pickupTimePreference?: Date;
  ngoPickedUp: boolean;
}

export type RequestedCarehome = {
  carehomeId: string;
  status: "requested" | "approved" | "rejected";
  requestedAt: Date;
  name?: string;
  email?: string;
  phone?: string;
};
