import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { CarehomeRegistrationType } from "@/src/validation/register/carehome/carehomeRegistration.schema";
import { FastifyError } from "../../donor/api/donation";
import { isAxiosError } from "axios";
import {
  FoodRequestHistoryType,
  FoodRequestType,
} from "@/src/validation/requestFood.schema";

export default async function getRequestHistory(): Promise<
  ApiResult<FoodRequestHistoryType[], FastifyError>
> {
  try {
    const res =
      await api.get<ApiResponse<FoodRequestHistoryType[]>>("/carehome/history");
    const { success, payload, message } = res.data;

    if (!success) {
      return { ok: false, error: res.data.payload as unknown as FastifyError };
    }

    return { ok: true, data: payload };
  } catch (err) {
    if (isAxiosError(err)) {
      return { ok: false, error: err.response?.data ?? err };
    }
    return {
      ok: false,
      error: {
        name: "Unexpected error",
        message: "Something went wrong while fetching donation history",
      } as FastifyError,
    };
  }
}
