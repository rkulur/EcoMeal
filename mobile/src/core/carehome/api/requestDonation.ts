import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { FastifyError } from "@/src/types/fastify";
import { isAxiosError } from "axios";

export default async function requestDonation(
  donationId: string,
): Promise<ApiResult<null>> {
  try {
    const res = await api.patch<ApiResponse<null | FastifyError>>(
      `/carehome/request-donation/${donationId}`,
    );
    const { success, payload, message } = res.data;

    if (!success) {
      return { ok: false, error: res.data.payload as FastifyError, message };
    }

    return { ok: true, data: payload as null, message };
  } catch (err) {
    if (isAxiosError<ApiResponse<null>>(err)) {
      return {
        ok: false,
        error: err,
        message: err.response?.data.message ?? "Unexpected Error",
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
