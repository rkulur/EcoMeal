import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { DonationType } from "@/src/validation/donate.schema";
import { FastifyError } from "./donation";
import { isAxiosError } from "axios";

export default async function getDonationHistory(): Promise<
  ApiResult<DonationType[], FastifyError>
> {
  try {
    const res = await api.get<ApiResponse<DonationType[]>>(
      "/donor/donation/history",
    );
    const { success, payload, message } = res.data;
    if (!success)
      return { ok: false, error: payload as unknown as FastifyError };
    return { ok: true, data: payload as DonationType[] };
  } catch (error) {
    if (isAxiosError(error))
      return { ok: false, error: error.response?.data ?? error };
    return {
      ok: false,
      error: {
        name: "Unexpected error",
        message: "Something went wrong while fetching donation history",
      } as FastifyError,
    };
  }
}
