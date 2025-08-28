import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { FastifyError } from "../../donor/api/donation";
import { isAxiosError } from "axios";
import { FoodItem } from "@/src/validation/donate.schema";

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
}

export default async function getAvailableDonations(): Promise<
  ApiResult<AvailableDonation[]>
> {
  try {
    const res = await api.get<ApiResponse<AvailableDonation[] | FastifyError>>(
      "/ngo/available-donations",
    );
    const { success, payload, message } = res.data;

    if (!success) {
      return { ok: false, error: payload as FastifyError };
    }

    return { ok: true, data: payload as AvailableDonation[] };
  } catch (error) {
    if (isAxiosError(error)) return { ok: false, error };
    return {
      ok: false,
      error: new Error("Unexpected Error", { cause: error }),
    };
  }
}
