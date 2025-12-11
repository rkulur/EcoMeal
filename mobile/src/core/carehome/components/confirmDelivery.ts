import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { DonationType } from "@/src/types/donor";
import { FastifyError } from "@/src/types/fastify";
import { isAxiosError } from "axios";

export default async function confirmDelivery(
  donationId: string,
): Promise<ApiResult<DonationType[]>> {
  try {
    const res = await api.patch<ApiResponse<DonationType[] | FastifyError>>(
      `/carehome/donation-received/${donationId}`,
    );
    const { success, payload, message } = res.data;
    if (!success) return { ok: false, error: payload as FastifyError, message };
    return { ok: true, data: payload as DonationType[], message };
  } catch (error) {
    if (isAxiosError(error))
      return { ok: false, error: error, message: "Unexpected Error" };
    return {
      ok: false,
      error: new Error("Error", { cause: error }),
      message: "Unexpected Error",
    };
  }
}
