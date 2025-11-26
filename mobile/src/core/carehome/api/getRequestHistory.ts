import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { FastifyError } from "@/src/types/fastify";
import { FoodRequestHistoryType } from "@/src/validation/requestFood.schema";
import { isAxiosError } from "axios";

export default async function getRequestHistory(): Promise<
  ApiResult<FoodRequestHistoryType[]>
> {
  try {
    const res =
      await api.get<ApiResponse<FoodRequestHistoryType[] | FastifyError>>(
        "/carehome/history",
      );
    const { success, payload, message } = res.data;

    if (!success) {
      return { ok: false, error: res.data.payload as FastifyError, message };
    }

    return { ok: true, data: payload as FoodRequestHistoryType[], message };
  } catch (err) {
    if (isAxiosError(err)) {
      return {
        ok: false,
        error: err.response?.data ?? err,
        message: "Unexpected error",
      };
    }
    return {
      ok: false,
      error: {
        name: "Unexpected error",
        message: "Something went wrong while fetching donation history",
      },
      message: "Unexpected error",
    };
  }
}
