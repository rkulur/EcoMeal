import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { FastifyError } from "@/src/types/fastify";
import { FoodRequestType } from "@/src/validation/requestFood.schema";
import { isAxiosError } from "axios";

export async function postRequestDonation(
  data: FoodRequestType,
): Promise<ApiResult<FoodRequestType>> {
  try {
    const res = await api.post<ApiResponse<FoodRequestType | FastifyError>>(
      "carehome/request-donation",
      data,
    );
    const { success, payload, message } = res.data;

    if (!success) {
      return { ok: false, error: payload as FastifyError, message };
    }

    return { ok: true, data: payload as FoodRequestType, message };
  } catch (err) {
    if (isAxiosError<FastifyError>(err)) {
      return {
        ok: false,
        error: err.response
          ? err.response.data
          : new Error("unknown error occured"),
        message: "Unexpected Error",
      };
    }
    return {
      ok: false,
      error: new Error("unknown error occured"),
      message: "Unexpected Error",
    };
  }
}
