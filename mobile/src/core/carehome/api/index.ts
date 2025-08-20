import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { FoodRequestType } from "@/src/validation/requestFood.schema";
import { isAxiosError } from "axios";
import { FastifyError } from "../../donor/api/donation";

export async function postRequestDonation(
  data: FoodRequestType,
): Promise<ApiResult<FoodRequestType>> {
  try {
    const res = await api.post<ApiResponse<FoodRequestType>>(
      "carehome/request-donation",
      data,
    );
    const success = res.data.success;

    if (!success) {
      return { ok: false, error: new Error(res.data.message) };
    }

    return { ok: true, data: res.data.payload };
  } catch (err) {
    if (isAxiosError<FastifyError>(err)) {
      return {
        ok: false,
        error: err.response
          ? err.response.data
          : new Error("unknown error occured"),
      };
    }
    return {
      ok: false,
      error: new Error("unknown error occured"),
    };
  }
}
