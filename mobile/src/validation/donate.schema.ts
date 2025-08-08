import { z } from "zod";

export const Step1Schema = z.object({
  foodItems: z
    .array(
      z.object({
        name: z.string().min(1, "Food name is required"),
        quantity: z.number().positive("Quantity must be greater than 0"),
        unit: z
          .enum([
            "plates",
            "servings",
            "packets",
            "containers",
            "trays",
            "bowls",
            "boxes",
            "liters",
            "ml",
          ])
          .default("plates"),
        expiryDate: z.coerce.date().refine(
          (date) => {
            const now = new Date();
            const maxDate = new Date();
            maxDate.setDate(now.getDate() + 2);
            return date <= maxDate;
          },
          { message: "Expiry date must be within the next 2 days" },
        ),
      }),
    )
    .min(1, "At least one food item must be added"),
});

export const Step2Schema = z.object({
  pickupAddress: z.object({
    address: z.string().min(1, "Address is required"),
    landmark: z.string().optional(),
    coordinates: z.object({
      lat: z.number().refine((val) => !isNaN(val), "Latitude is required"),
      lng: z.number().refine((val) => !isNaN(val), "Longitude is required"),
    }),
  }),
  pickupTimePreference: z.coerce.date().optional(),
});

export const Step3Schema = z.object({
  images: z
    .array(
      z.object({
        url: z.string().url("Image URL must be valid"),
        uploadedAt: z.coerce.date().optional(),
      }),
    )
    .min(3, "At least three images are required"),
});

export const DonationSchema = Step1Schema.merge(Step2Schema).merge(Step3Schema);
export type step1Type = z.infer<typeof Step1Schema>;
export type step2Type = z.infer<typeof Step2Schema>;
export type step3Type = z.infer<typeof Step3Schema>;

export type DonationType = {
  _id: string;
  donor: string;

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

  pickupAddress: {
    address: string;
    landmark?: string;
    coordinates: {
      lat?: number;
      lng?: number;
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
};
