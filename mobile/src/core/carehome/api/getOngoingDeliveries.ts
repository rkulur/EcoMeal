import { api, ApiResponse, ApiResult } from "@/src/api/axios";
import { DonationType } from "@/src/types/donor";
import { FastifyError } from "@/src/types/fastify";
import { isAxiosError } from "axios";

export default async function getOngoingDeliveries(): Promise<
  ApiResult<DonationType[]>
> {
  try {
    const res = await api.get<ApiResponse<DonationType[] | FastifyError>>(
      "/carehome/ongoing-deliveries",
    );
    const { success, payload, message } = res.data;

    if (!success) {
      return { ok: false, error: res.data.payload as FastifyError, message };
    }

    return { ok: true, data: payload as DonationType[], message };
  } catch (err) {
    if (isAxiosError<ApiResponse<DonationType[]>>(err)) {
      return {
        ok: false,
        error: err,
        message: err.response?.data.message ?? "Unexpected error",
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
