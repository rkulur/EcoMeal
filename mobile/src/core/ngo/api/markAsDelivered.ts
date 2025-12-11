import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { isAxiosError } from "axios";
import { FastifyError } from "@/src/types/fastify";
import { DonationType } from "@/src/types/donor";

export default async function markAsDelivered(
  donationId: string,
): Promise<ApiResult<DonationType>> {
  try {
    const res = await api.patch<ApiResponse<DonationType | FastifyError>>(
      `/ngo/mark-as-delivered/${donationId}`,
    );
    const { success, payload, message } = res.data;

    if (!success) {
      return { ok: false, error: payload as FastifyError, message };
    }

    return { ok: true, data: payload as DonationType, message };
  } catch (error) {
    if (isAxiosError(error))
      return { ok: false, error, message: "Unexpected error occured" };
    return {
      ok: false,
      error: new Error("Unexpected Error", { cause: error }),
      message: "Unexpected error occured",
    };
  }
}
